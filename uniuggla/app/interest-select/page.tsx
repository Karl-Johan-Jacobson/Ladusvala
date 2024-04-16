//imports interest list fronm database
import Interest from "@/types/interest"
import InterestList from "@/components/interest_list"
import InterestListItem from "@/components/interest_list_item"

export default function InterestSelect() {
  const exampleInterests: Interest[] = [
    { id: 1, name: "Hästar", description: "bkoajsfseiof" },
    { id: 2, name: "Datorer", description: "aljkdoiakefjwehf" },
  ];

  return (
    <InterestList interest={exampleInterests} />
  );
}