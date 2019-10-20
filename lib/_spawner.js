const { spawn } = require("child_process");
const chalk = require("chalk");
const Notify = require("./notify");
const ora = require("ora");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

require("dotenv").config();

class Spawner {
  constructor(doneText, port) {
    // instance props
    this.spinner = ora({
      prefixText: chalk.cyan.bold("	PRs are like a box of chocolates..."),
      spinner: "grenade"
    });
    this.port = port;
    this.notify = new Notify(
      "Local endpoint is ready",
      `Port ${port} is up and ready`,
      true
    );
    this.pingInterval;

    // instance state
    this.state = {
      loadedText: chalk.white.bold(doneText),
      success: false
    };

    // binds
    this.pingServer = this.pingServer.bind(this);
    this.spawnAndSpin = this.spawnAndSpin.bind(this);
  }

  serverUp(connected) {
    const { loadedText } = this.state;

    if (connected) {
      this.state = Object.assign({}, this.state, { success: true });
      this.spinner.succeed(loadedText);
      this.spinner.clear();
      this.notify.init();

      return { serverUp: true };
    }
  }

  pingServer() {
    return exec(`curl -c1 --max-time 1 http://localhost:${this.port}`)
      .then(_ => true)
      .catch(_ => false);
  }

  spawnAndSpin(action, opts, workingDir) {
    const spawnAction = spawn(action, opts, {
      cwd: `${workingDir}`,
      detached: true
    });

    spawnAction.stderr.on("data", data => console.log(data.toString()));

    spawnAction.unref();

    this.spinner.start();
  }
}

module.exports = Spawner;