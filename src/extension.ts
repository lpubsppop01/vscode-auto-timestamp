'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as moment from 'moment';

export function activate(context: vscode.ExtensionContext) {
    const core = new ExtensionCore();
    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(e => {
        core.onWillSaveTextDocument(e);
    }));
}

export function deactivate() {
}

class ExtensionCore {

    public onWillSaveTextDocument(e: vscode.TextDocumentWillSaveEvent) {
        const config = new ExtensionConfiguration(e.document);
        if (!e.document.fileName.match(config.fileNamePattern)) return;
        if (e.reason == vscode.TextDocumentSaveReason.AfterDelay) return;
        var edits: vscode.TextEdit[] = [];
        const lineIndices = this.getIndexRangeUntil(config.lineLimit, e.document.lineCount);
        for (const iLine of lineIndices) {
            const line = e.document.lineAt(iLine);

            const birthTimeRange = this.getTextRangeBetween(line,
                 config.birthTimeStart, config.birthTimeEnd);
            if (birthTimeRange != null && birthTimeRange.isEmpty) {
                const stats = fs.statSync(e.document.fileName);
                const timeStr = moment(stats.birthtime).format(config.momentFormat);
                edits.push(vscode.TextEdit.replace(birthTimeRange, timeStr));
            }

            const modifiedTimeRange = this.getTextRangeBetween(line,
                 config.modifiedTimeStart, config.modifiedTimeEnd);
            if (modifiedTimeRange != null) {
                const timeStr = moment().format(config.momentFormat);
                edits.push(vscode.TextEdit.replace(modifiedTimeRange, timeStr));
            }
        }
        e.waitUntil(Promise.resolve(edits));
    }

    private getIndexRangeUntil(limit: number, count: number): number[] {
        const indices: number[] = [];
        if (limit > 0) {
            let i = 0;
            const iMax = Math.min(limit, count);
            while (i < iMax) {
                indices.push(i++);
            }
        } else {
            let i = count - 1;
            const iMin = Math.max(count + limit, 0);
            while (i >= iMin) {
                indices.push(i--);
            }
        }
        return indices;
    }

    private getTextRangeBetween(line: vscode.TextLine, startPattern: RegExp, endPattern: RegExp): vscode.Range {
        const startResult = line.text.match(startPattern);
        if (startResult == null) return null;
        const iRangeStart = startResult.index + startResult[0].length;
        const endResult = line.text.substring(iRangeStart).match(endPattern);
        if (endResult == null) return null;
        const iRangeEnd = iRangeStart + endResult.index;
        const startPos = new vscode.Position(line.lineNumber, iRangeStart);
        var endPos = new vscode.Position(line.lineNumber, iRangeEnd);
        return new vscode.Range(startPos, endPos);
    }

}

class ExtensionConfiguration {

    private m_config: vscode.WorkspaceConfiguration;

    public constructor(document: vscode.TextDocument) {
        this.m_config = vscode.workspace.getConfiguration("lpubsppop01.autoTimeStamp", document);
    }

    private getValue<T>(propertyName: string, defaultValue: T): T {
        if (this.m_config == null) return defaultValue;
        const value = this.m_config.get<T>(propertyName);
        return value != null ? value : defaultValue;
    }

    private m_fileNamePattern: RegExp;
    public get fileNamePattern(): RegExp {
        if (this.m_fileNamePattern == null) {
            this.m_fileNamePattern = new RegExp(this.getValue<string>("filenamePattern", "^(?!.*[/\\\\]\\.vscode[/\\\\]settings.json$)"));
        }
        return this.m_fileNamePattern;
    }

    public get lineLimit(): number {
        return this.getValue<number>("lineLimit", 5);
    }

    private m_birthTimeStart: RegExp;
    public get birthTimeStart(): RegExp {
        if (this.m_birthTimeStart == null) {
            this.m_birthTimeStart = new RegExp(this.getValue<string>("birthTimeStart", "[cC]reated *: "));
        }
        return this.m_birthTimeStart;
    }

    private m_birthTimeEnd: RegExp;
    public get birthTimeEnd(): RegExp {
        if (this.m_birthTimeEnd == null)  {
            this.m_birthTimeEnd = new RegExp(this.getValue<string>("birthTimeEnd", "$"));
        }
        return this.m_birthTimeEnd;
    }

    private m_modifiedTimeStart: RegExp;
    public get modifiedTimeStart(): RegExp {
        if (this.m_modifiedTimeStart == null) {
            this.m_modifiedTimeStart = new RegExp(this.getValue<string>("modifiedTimeStart", "[lL]ast[ -][mM]odified *: "));
        }
        return this.m_modifiedTimeStart;
    }

    private m_modifiedTimeEnd: RegExp;
    public get modifiedTimeEnd(): RegExp {
        if (this.m_modifiedTimeEnd == null) {
            this.m_modifiedTimeEnd = new RegExp(this.getValue<string>("modifiedTimeEnd", "$"));
        }
        return this.m_modifiedTimeEnd;
    }

    public get momentFormat(): string {
        return this.getValue<string>("momentFormat", "YYYY/MM/DD HH:mm:ss");
    }

}