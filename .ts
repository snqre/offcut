async function main() {
    console.log("Welcome to My CLI App!");
  
    // Define your questions
    const questions = [
      {
        type: 'input',
        name: 'username',
        message: 'What is your name?',
      },
      {
        type: 'list',
        name: 'favoriteColor',
        message: 'Choose your favorite color:',
        choices: ['Red', 'Blue', 'Green', 'Yellow'],
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to continue?',
      },
    ];
  
    // Prompt the user
    try {
      const answers = await inquirer.prompt(questions);
      console.log('Your Answers:');
      console.log(answers);
  
      if (answers.confirm) {
        console.log(`Great! Let's proceed, ${answers.username}.`);
      } else {
        console.log("Goodbye!");
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  // Run the main function
  main();