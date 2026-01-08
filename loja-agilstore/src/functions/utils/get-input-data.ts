export function getInput(prompt?: string): Promise<string> {
    return new Promise((resolve) => {
      if(prompt){
        process.stdout.write(prompt);
      }
      process.stdin.resume();  
      process.stdin.once("data", (data) => {
        resolve(data.toString().trim());
      });
    });
  }
  