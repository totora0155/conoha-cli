'use strict';
const path = require('path');
const meow = require('meow');
const cli = meow(
  `
  Usage
    $ conoha <command> <options...>

  Commands
    ready              Prepare necessary data

    flavors            Show Flavors
    images             Show Images
    isoImages          Show Iso-Images
    servers            Show servers list
    serversDetail      Show detailed servers list
    serverInfo         Show the Server
    addServer          Add Server
    deleteServer       Delete Server

    objectStorageInfo  Show Object-Storage data
    containerInfo      Show the Container info
    addContainer       Add Container
    deleteContainer    Delete Container
    containerUpload    Upload to the Container
    containerDownload  Download form the Container
    containerDelete    Delete to item in Container
    containerPublish   Publish to item in Container

  Options
    -h --help         Show help
    -i --inquire      Inquire mode
    -c --config       ...
    -d --dirname      Specify a target property (lodash.get)
    -p --props        Pick object keys (lodash.pick)
    -f --form         Set \`application/x-www-form-urlencoded\`
    -j --json         Read .json
       --server-id    Set serverID
       --container    Set container
       --object       Set object

  Examples
    $ conoha ready

    Created \`~/.conoha/data.json\`
    {...}
  `, {
    alias: {
      f: 'form',
      g: 'get',
      i: 'inquirer'
    }
  });
const helper = require('./helper');

module.exports = cli;

Object.assign(cli, {
  form: () => {
    if (cli.flags.j || cli.flags.json) {
      let formData = null;
      if (cli.flags.j || cli.flags.json) {
        try {
          const jsonPath = path.resolve(cli.flags.j || fli.flags.json);
          formData = helper.readFile(jsonPath,
            `
            \`${jsonPath} doesn't exists\`
            `);
        } catch (err) {
          console.log(err);
          process.exit(1);
        }
      }
      return formData;
    }
    return cli.flags.f || cli.flags.form;
  }()
});
