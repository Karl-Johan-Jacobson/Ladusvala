//imports interest list fronm database
import Interest from "@/types/interest"
import InterestList from "@/components/interest_list"
import InterestListItem from "@/components/interest_list_item"
//import { fetchAllInterests } from "@/firebase/firebaseHandler"

export default async function InterestsPage() {
    //const interests = await fetchAllInterests()
    const interests: Interest[] = [
      { interestId: "1", interestTitle: "Interest 1", interestDescription: "Description for Interest 1" },
      { interestId: "2", interestTitle: "Interest 2", interestDescription: "Description for Interest 2" },
      { interestId: "3", interestTitle: "Interest 3", interestDescription: "Description for Interest 3" },
      { interestId: "4", interestTitle: "Interest 4", interestDescription: "Description for Interest 4" },
      { interestId: "5", interestTitle: "Interest 5", interestDescription: "Description for Interest 5" },
      { interestId: "6", interestTitle: "Interest 6", interestDescription: "Description for Interest 6" },
      { interestId: "7", interestTitle: "Interest 7", interestDescription: "Description for Interest 7" },
      { interestId: "8", interestTitle: "Interest 8", interestDescription: "Description for Interest 8" },
      { interestId: "9", interestTitle: "Interest 9", interestDescription: "Description for Interest 9" },
      { interestId: "10", interestTitle: "Interest 10", interestDescription: "Description for Interest 10" },
      { interestId: "11", interestTitle: "Interest 11", interestDescription: "Description for Interest 11" },
      { interestId: "12", interestTitle: "Interest 12", interestDescription: "Description for Interest 12" },
      { interestId: "13", interestTitle: "Interest 13", interestDescription: "Description for Interest 13" },
      { interestId: "14", interestTitle: "Interest 14", interestDescription: "Description for Interest 14" },
      { interestId: "15", interestTitle: "Interest 15", interestDescription: "Description for Interest 15" },
      { interestId: "16", interestTitle: "Interest 16", interestDescription: "Description for Interest 16" },
      { interestId: "17", interestTitle: "Interest 17", interestDescription: "Description for Interest 17" },
      { interestId: "18", interestTitle: "Interest 18", interestDescription: "Description for Interest 18" },
      { interestId: "19", interestTitle: "Interest 19", interestDescription: "Description for Interest 19" },
      { interestId: "20", interestTitle: "Interest 20", interestDescription: "Description for Interest 20" },
      { interestId: "21", interestTitle: "Interest 21", interestDescription: "Description for Interest 21" },
      { interestId: "22", interestTitle: "Interest 22", interestDescription: "Description for Interest 22" },
      { interestId: "23", interestTitle: "Interest 23", interestDescription: "Description for Interest 23" },
      { interestId: "24", interestTitle: "Interest 24", interestDescription: "Description for Interest 24" },
      { interestId: "25", interestTitle: "Interest 25", interestDescription: "Description for Interest 25" },
  ];

    return (
      <>
        <InterestList interest={interests} />
      </>
    )
}