import * as vscode from 'vscode';


const decorationType = vscode.window.createTextEditorDecorationType({});


export function setDescription(editor: typeof vscode.window.activeTextEditor, line: number, text: string) {
  if (editor) {
    const configuration = vscode.workspace.getConfiguration('Motivator');
    const rangesOrOptions = {
      renderOptions: {
        after: {
          contentText: text,
          margin: `0 0 0 ${configuration.margin}rem`,
          fontStyle: configuration.fontStyle,
        },
        dark: { after: { color: configuration.darkColor } },
        light: { after: { color: configuration.lightColor } },
      },
      range: new vscode.Range(
        new vscode.Position(line, 1024),
        new vscode.Position(line, 1024),
      ),
    };
    editor.setDecorations(decorationType, [rangesOrOptions]);
  }
}

