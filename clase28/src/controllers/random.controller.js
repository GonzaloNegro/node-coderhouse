import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.resolve(__dirname, "../utils/randomCalculus.js");

export const Randomnumbers = async (req, res) => {
  try {
    const random = fork(scriptPath);
    random.send({ msg: "start", cant: req.params.cant });
    random.on("message", (numbers) => {
      res.json({
        resultado: numbers,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};
