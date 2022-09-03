import { mount } from "@vue/test-utils";
import DepartureForm from "@/components/moleculs/DepartureForm";

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  ok: true
}));
global.performance.mark = jest.fn();
global.performance.measure = jest.fn();
describe('What happens within the form to update flight status', () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('That we make no request if the form has errors', async () => {
    const comp = mount(DepartureForm);
    await comp.find('form').trigger('submit');
    const spy = jest.spyOn(comp.vm, 'sendUpdate');

    expect(spy).not.toHaveBeenCalled()
    expect(() => {
      comp.get('.edit-status__error');
    }).not.toThrow();

  });

  test('We fill the form in with custom data & it will submit', async () => {
    const comp = mount(DepartureForm);
    const codeElm = comp.find('#flight-code');
    const statusElm = comp.find('#flight-status');
    const spy = jest.spyOn(comp.vm, 'sendUpdate');

    await codeElm.setValue('VK245t');
    await statusElm.setValue('Landing');
    await comp.find('form').trigger('submit');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
