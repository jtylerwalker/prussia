const inquirer = require("inquirer");

const static = (() => {
  const quotes = [
    `"Go forth and break something..." - Cy`,
    `"Right on." - Houston`,
    `"Go with your heart" - Design`,
    `"God help us all" - Danila`,
    `"Yeet" - Owen`,
    `"*sigh*" - Justin`,
    `"I deal with 5 year olds at home; I deal with five year olds at work." - Elliot`,
    `"Who hurt you?" - Kyle`,
    `"I'm going to show my screen now. *shows screen" - Perl Jam`,
    `"*Throws frying pan in past life a la Gordon Ramsey*" - Zach`
  ];

  const randomQuote = () => Math.floor(Math.random() * quotes.length);

  const title = () => {
    let ui = new inquirer.ui.BottomBar();

    ui.log.write(
      `----------------------------------------` +
        `----------------------------------------`
    );
    ui.log.write(`\
    #        ##   #####  ####  #    # 
    #       #  #    #   #    # #    # 
    #      #    #   #   #      ###### 
    #      ######   #   #      #    # 
    #      #    #   #   #    # #    # 
    ###### #    #   #    ####  #    # 
  `);
    ui.log.write(
      "\
    -----------------------------------------\
    -----------------------------------------\
    "
    );
  };

  const segue = () => {
    let ui = new inquirer.ui.BottomBar();

    ui.log.write(
      "\
    ----------------------------------------\
    ----------------------------------------\
    "
    );
    ui.log.write(`\
      ${randomQuote()}
    `);
    ui.log.write(
      "\
    -----------------------------------------\
    -----------------------------------------\
    "
    );
  };

  const list = projects => {
    try {
      Object.keys(projects).forEach(k => console.log(`\ ${k} `));
    } catch (e) {
      console.log(`\
        Looks like you have not created any projects yet.
        Run 'latch new' to set up a new environment. 
      `);
    }
  };

  return { list, segue, title };
})();

module.exports = static;