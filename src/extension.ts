import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// --- Proper node-fetch import ---
type VSFetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
const fetchFn: VSFetch = async (...args) => {
    const mod = await import('node-fetch');
    return (mod.default as unknown as VSFetch)(...args);
};

interface AIResponse {
    candidates?: {
        content?: {
            parts?: { text: string }[];
        };
    }[];
}

// --- Helper: Load Gemini key from .vscode/settings.json ---
function getApiKeyFromLocalSettings(): string | undefined {
    try {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        let workspaceRoot = workspaceFolders?.[0]?.uri.fsPath;

        // 🔧 Hardcoded fallback (your exact path)
        if (!workspaceRoot) {
            workspaceRoot = "C:\\Users\\Placido Furtado\\Desktop\\VS_XTENS\\codeguide-ai";
            console.log("⚙️ Using fallback workspace root:", workspaceRoot);
        }

        const settingsPath = path.join(workspaceRoot, '.vscode', 'settings.json');
        console.log("🔍 Checking for settings file at:", settingsPath);

        if (fs.existsSync(settingsPath)) {
            const settingsRaw = fs.readFileSync(settingsPath, 'utf-8');
            console.log("🧾 settings.json contents:", settingsRaw);
            const settings = JSON.parse(settingsRaw);
            return settings["codeguide-ai.geminiApiKey"];
        } else {
            console.log("🚫 settings.json not found at:", settingsPath);
        }
    } catch (err) {
        console.error("⚠️ Failed to read local settings:", err);
    }
    return undefined;
}

// --- Activate Extension ---
export function activate(context: vscode.ExtensionContext) {
    console.log('✅ CodeGuide AI activated!');

    const explainCode = vscode.commands.registerCommand('codeguide-ai.explainCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText.trim()) {
            vscode.window.showWarningMessage('Please select some code first.');
            return;
        }

        try {
            let apiKey = getApiKeyFromLocalSettings();

            // Fallback to VS Code config if not found
            if (!apiKey) {
                const config = vscode.workspace.getConfiguration('codeguide-ai');
                apiKey = config.get<string>('geminiApiKey');
            }

            if (!apiKey) {
                vscode.window.showErrorMessage('❌ Gemini API key not found in .vscode/settings.json or VS Code settings.');
                return;
            }

            vscode.window.showInformationMessage('🤖 Generating explanation using Gemini...');

            const response = await fetchFn(
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `Explain the following code clearly and concisely:\n\n${selectedText}`
                                    }
                                ]
                            }
                        ]
                    })
                }
            );

            if (!response.ok) {
                const errText = await response.text();
                vscode.window.showErrorMessage(`API Error: ${errText}`);
                return;
            }

            const data = (await response.json()) as AIResponse;
            console.log("🧩 Gemini Raw Response:", JSON.stringify(data, null, 2));

            const explanation =
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "⚠️ No explanation received.";

            const panel = vscode.window.createWebviewPanel(
                'codeExplanation',
                '💡 Code Explanation',
                vscode.ViewColumn.Beside,
                { enableScripts: false }
            );

            panel.webview.html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: monospace, sans-serif;
                        padding: 15px;
                        background: #1e1e1e;
                        color: #dcdcdc;
                    }
                    h2 {
                        color: #4fc3f7;
                    }
                    .content {
                        max-height: 85vh;
                        overflow-y: auto;
                        border: 1px solid #444;
                        padding: 12px;
                        border-radius: 8px;
                        background: #252526;
                        white-space: pre-wrap;
                        line-height: 1.5;
                    }
                </style>
            </head>
            <body>
                <h2>💬 Code Explanation</h2>
                <div class="content">${explanation.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </body>
            </html>`;
        } catch (err: any) {
            vscode.window.showErrorMessage(`Error fetching explanation: ${err.message}`);
        }
    });

    context.subscriptions.push(explainCode);
}

export function deactivate() {}
