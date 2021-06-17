import { formatDate } from "../app/lib/formatDate";

test("formats date", () => {
  let testData = [
    {
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/daykiine/128.jpg",
      createdAt: "2021-03-31T13:24:14.020Z",
      id: "16",
      name: "Ryann Wiegand",
    },
  ];
  let expectedDate = "03/31/2021 at 1:24 pm";
  let actualDate = formatDate(testData);
  expect(actualDate[0].createdAt).toEqual(expectedDate);
});
