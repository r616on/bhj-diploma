/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list([User.current()], (e, response) => {
      const element = this.element;

      const accSelect = element.querySelector(".accounts-select")
      const arrSelect = Array.from(accSelect.querySelectorAll("option"));
      if (arrSelect.length > 0) {
        arrSelect.forEach((item) => item.remove())
      };
      if ((response.success) && (response.data.length > 0)) {
        response.data.forEach(item => {
          let options = document.createElement('option')
          options.value = item.id;
          options.innerText = item.name;
          accSelect.append(options);
        });
      }

    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.getModal("newIncome").close();
        // Вопрос как мы можем вызывать метод close() в данном выражении если он принадлежит не 
        // App.js а Modal.js ??
        App.getModal("newExpense").close();
        App.update();
        this.element.reset();
      }
    })
  }
}