/*
"use server"

import * as fs from 'fs';
import Interest from "@/types/interest";



export async function readJsonFile(): Promise<Interest[]> {
    return new Promise((resolve, reject) => {
    const filePath: string = 'public/dataset/intrests.json';
      fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          reject(err);
          return;
        }
        let allInterests : Interest[] = [];
        try {
          const jsonArray = JSON.parse(data) as any[];
           allInterests = jsonArray.map((item) => ({
            interestTitle: item.interestTitle as string,
            interestId: "0",
            interestDescription: item.interestDescription as string
          }));
          resolve(allInterests);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }
  */