
'use strict';

// src/extension.ts

import * as vscode from 'vscode';



import { livecodescriptConfigDocumentSymbolProvider } from './lc-declaration';




export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(
            { scheme: "file", language: "livecodescript" },
            new livecodescriptConfigDocumentSymbolProvider()
        )
    );
}








