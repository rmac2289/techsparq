import { formatDate } from "./lib/formatDate.js";
import { fetchData } from "./lib/fetchData.js";
import { loadHandlebars } from "./lib/loadHandlebars.js";
import { toggle } from "./lib/toggle.js";

window.onload = async () => {
  let fetchedData = await fetchData();
  formatDate(fetchedData);
  loadHandlebars(fetchedData);
  toggle();
};
