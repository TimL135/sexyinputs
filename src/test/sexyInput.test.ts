import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Examples from "../views/Examples.vue";
const wrapper = mount(Examples);
test("search", async () => {
  const input = wrapper.find("input[type=search]");
  await input.setValue("search");
  expect(input.element.value).toBe("search");
});
test("email", async () => {
  const input = wrapper.find("input[type=email]");

  await input.setValue("email");
  expect(input.element.reportValidity()).toBeFalsy();
  await input.setValue("email@w");
  expect(input.element.reportValidity()).toBeTruthy();
});
test("password", async () => {
  const input = wrapper.find("input[type=password]");
  await input.setValue("");
  expect(input.element.reportValidity()).toBeFalsy();
  await input.setValue("password");
  expect(input.element.reportValidity()).toBeTruthy();
});

test("text", async () => {
  const input = wrapper.find("input[type=text]");

  await input.setValue("text");
  expect(input.element.value).toBe("text");
});
test("number", async () => {
  const input = wrapper.find("input[type=number]");

  await input.setValue("text");
  expect(input.element.value).toEqual("");
  await input.setValue(8);
  expect(input.element.value).toEqual("8");
});
test("select", async () => {
  const input = wrapper.find('input[data-test="select"]');
  expect(wrapper.findAll("div.simple-typeahead-list")).toHaveLength(0);
  await input.trigger("focus");
  expect(wrapper.findAll("div.simple-typeahead-list")).toHaveLength(1);
  expect(wrapper.findAll("div.simple-typeahead-list-item")).toHaveLength(6);
  await input.setValue(5);
  expect(wrapper.findAll("div.simple-typeahead-list-item")).toHaveLength(1);
  await input.setValue(8);
  await input.trigger("blur");
  expect(input.element.value).toEqual("");
  await input.setValue(5);
  await input.trigger("blur");
  expect(input.element.value).toEqual("5");
  expect(wrapper.findAll("div.simple-typeahead-list")).toHaveLength(0);
});
test("select2", async () => {
  const input = wrapper.find('input[data-test="select2"]');
  expect(wrapper.findAll("div.simple-typeahead-list")).toHaveLength(0);
  await input.trigger("focus");
  expect(wrapper.findAll("div.simple-typeahead-list")).toHaveLength(1);
  expect(wrapper.findAll("div.simple-typeahead-list-item")).toHaveLength(6);
  await input.setValue(5);
  expect(wrapper.findAll("div.simple-typeahead-list-item")).toHaveLength(1);
  await input.setValue(8);
  await input.trigger("blur");
  expect(input.element.value).toEqual("8");
  await input.setValue(5);
  await input.trigger("blur");
  expect(input.element.value).toEqual("5");
});
test("multiSelect", async () => {
  const input = wrapper.find('input[data-test="multiSelect"]');
  expect(wrapper.findAll("div.justify-content-between")).toHaveLength(1);
  await wrapper.find("div.justify-content-between > span").trigger("click");
  expect(wrapper.findAll("div.justify-content-between")).toHaveLength(0);
  await input.setValue(2);
  await input.trigger("blur");
  expect(wrapper.findAll("div.justify-content-between")).toHaveLength(1);
  await input.trigger("focus");
  expect(wrapper.findAll("div.simple-typeahead-list")).toHaveLength(1);
  expect(wrapper.findAll("div.simple-typeahead-list-item")).toHaveLength(5);
  await wrapper.find("div.simple-typeahead-list-item").trigger("click");
  await input.trigger("blur");
  expect(wrapper.findAll("div.simple-typeahead-list")).toHaveLength(0);
  expect(wrapper.findAll("div.justify-content-between")).toHaveLength(2);
});
