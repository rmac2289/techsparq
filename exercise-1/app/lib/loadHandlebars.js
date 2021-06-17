export const loadHandlebars = (fetchedData) => {
  const template = document.getElementById("template").innerHTML;

  const compiled_template = Handlebars.compile(template);

  const rendered = compiled_template({ data: fetchedData });

  document.getElementById("target").innerHTML = rendered;
};
