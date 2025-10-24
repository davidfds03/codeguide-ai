Absolutely 👍 Here’s a **professional, GitHub-ready `README.md`** for your VS Code extension **CodeGuide AI** — complete with badges, setup steps, and usage instructions.

---

````markdown
# 🧠 CodeGuide AI

[![Visual Studio Marketplace](https://img.shields.io/badge/VSCODE-Extension-blue?logo=visualstudiocode)](https://marketplace.visualstudio.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?logo=node.js)](https://nodejs.org)

> ✨ A VS Code extension that uses **Google Gemini AI** to explain your selected code directly inside VS Code.

---

## 🚀 Features

✅ **Explain Selected Code** — Highlight any code, press `Ctrl+Shift+P`, run **"Explain Selected Code"**, and get an AI-powered explanation.  
⚙️ **Configurable Gemini API Key** — Securely store your key in VS Code settings.  
🧩 **Lightweight** — Built with TypeScript + esbuild for fast performance.  
🧠 **Supports multiple languages** — Works with Python, Java, JavaScript, and more.

---

## 🧰 Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/<your-username>/codeguide-ai.git
   cd codeguide-ai
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the extension:

   ```bash
   npm run compile
   ```

4. Launch in VS Code:

   * Press **F5** to open an *Extension Development Host* window.
   * The extension will auto-load.

---

## 🔑 Setup Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new **API Key**.
3. Open VS Code → **Settings (`Ctrl+,`)**
4. Search for: `codeguide-ai`
5. Paste your key under:

   ```
   CodeGuide AI › Gemini API Key
   ```

Alternatively, add it directly to your settings JSON:

```json
{
  "codeguide-ai.geminiApiKey": "YOUR_API_KEY_HERE"
}
```

---

## 💡 Usage

1. Select any code snippet in the editor.
2. Open **Command Palette** → search for:

   ```
   Explain Selected Code
   ```
3. The extension will generate an explanation using Gemini AI.

---

## ⚙️ Configuration

| Setting                     | Description         | Default |
| --------------------------- | ------------------- | ------- |
| `codeguide-ai.geminiApiKey` | Your Gemini API Key | `""`    |

---

## 🧩 Development

To modify or contribute:

```bash
git clone https://github.com/<your-username>/codeguide-ai.git
cd codeguide-ai
npm install
npm run watch   # automatically rebuilds on file changes
```

Then press **F5** in VS Code to run in a sandbox.

---

## 🧠 API Models

By default, the extension uses:

```
models/gemini-2.5-flash
```

If needed, update this in `src/extension.ts` for newer models.

---

## 🪄 Example Output

> **User Code:**
>
> ```python
> def factorial(n):
>     return 1 if n <= 1 else n * factorial(n-1)
> ```

> **CodeGuide AI:**
> “This function calculates the factorial of a number recursively.
> It multiplies `n` by the factorial of `n-1` until `n` equals 1.”

---


---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify.

---

## ⭐ Contribute

If you find this project helpful, please:

* 🌟 Star the repo
* 🐛 Report bugs via [Issues](https://github.com/<your-username>/codeguide-ai/issues)
* 💡 Suggest new features!

---

> Made with ❤️ using [VS Code API](https://code.visualstudio.com/api) and [Google Gemini](https://aistudio.google.com).

```

---

Would you like me to **customize the README** to include a **real screenshot** or **demo GIF** section (like “See it in action”)? That makes it look much more professional on GitHub.
```
