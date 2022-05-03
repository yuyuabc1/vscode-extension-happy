// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import logger from './logger';
import { setDescription } from './descriptor';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	vscode.window.onDidChangeTextEditorSelection(() => {
		getMotivator();
	});

	vscode.workspace.onDidChangeConfiguration(() => {
		getMotivator();
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('motivator.hello', getHello);

	getHello();

	context.subscriptions.push(disposable);

	console.log('Congratulations, your extension "motivator" is now active!');
}

function getMotivator() {
	try {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {return;} 
		// 当前鼠标位置
		const position = editor.selection.active;
		// 获取配置
		const configuration = vscode.workspace.getConfiguration('Motivator');
		const { line } = position;
		let text = '';
		if (configuration.textList) {
			const idx = Math.floor((Math.random() * configuration.textList.length));
			text = configuration.textList[idx];
		}

		setDescription(editor, line, text);
	} catch (err) {
		console.log(err);
	}
}

function getHello() {
	const days = new Date().getDay();
	let week;

	const { master } = vscode.workspace.getConfiguration('Motivator');

	switch(days) {
			case 1:
					week = '星期一';
					break;
			case 2:
					week = '星期二';
					break;
			case 3:
					week = '星期三';
					break;
			case 4:
					week = '星期四';
					break;
			case 5:
					week = '星期五';
					break;
			case 6:
					week = '星期六';
					break;
			case 0:
					week = '星期日';
					break;
	}

	vscode.window.showInformationMessage(`你好! ${master} ${week}也会是开心的一天！`);
}

// this method is called when your extension is deactivated
export function deactivate() {}
