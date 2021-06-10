// Copyright (c) 2020 - 2021 Discordeno

export function sheduleTask(task: Task) {
  setTimeout(async () => {
    console.log(`Running Task ${task.name}`);
    try {
      await task.execute();
    } catch (error) {
      console.error(error);
    }

    setInterval(async () => {
      console.log(`Running Task ${task.name}`);
      try {
        await task.execute();
      } catch (error) {
        console.error(error);
      }
    }, task.interval);
  }, task.interval - (Date.now() % task.interval));
}

interface Task {
  name: string;
  execute: () => unknown;
  interval: number;
}
