


/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error("Передан пустой элемент!");
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (localStorage.lastOptions) {
      const lastOptions = JSON.parse(localStorage.lastOptions);
      this.render(lastOptions);
    } else {
      this.render();
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener("click", (e) => {
      const perentItem = e.target.closest(".btn")
      if (perentItem) {
        if (perentItem.classList.contains("remove-account")) {
          this.removeAccount(perentItem.dataset.id);
        } else if (perentItem.classList.contains("transaction__remove")) {
          this.removeTransaction(perentItem.dataset.id);
        }
      }
    });


  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {

    if (localStorage.lastOptions) {
      let userAgree = confirm("Вы действительно хотите удалить счёт?");
      if (userAgree) {
        const lastOptions = JSON.parse(localStorage.lastOptions);
        const data = { id: lastOptions.account_id, };
        Account.remove(data, (err, response) => {
          if (response.success) {
            App.updateWidgets();
            this.clear();
          }
        });
      }


    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    let userAgree = confirm("Вы действительно хотите удалить эту транзакцию?");
    if (userAgree) {
      const data = { id: id, }
      Transaction.remove(data, (err, response) => {
        if (response.success) {
          App.update();
        }
      })
    }

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      localStorage.lastOptions = JSON.stringify(options);
      Account.get(options.account_id, (err, response) => {

        if (response.success && response.data) {
          this.renderTitle(response.data.name);
        }
      });
      Transaction.list(options, (err, response) => {
        this.renderTransactions(response.data);
      });

    }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    const clear = {};
    this.renderTransactions(clear);
    this.renderTitle("Название счета");
    localStorage.removeItem("lastOptions");
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const title = this.element.querySelector(".content-title");
    title.innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let data = date.trim();
    let dataArr = data.split('');
    let day = dataArr[8] + dataArr[9];
    let ear = dataArr[0] + dataArr[1] + dataArr[2] + dataArr[3];
    let month = dataArr[5] + dataArr[6];
    const mounthArr = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    month = mounthArr[+month - 1];
    let hour = dataArr[11] + dataArr[12];
    let minut = dataArr[14] + dataArr[15];
    return `${day} ${month} ${ear} г. в ${hour}:${minut}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    let type;
    if (item.type === "income") {
      type = "transaction_income";
    } else {
      type = "transaction_expense";
    }
    let transactionHTML = document.createElement('div');
    transactionHTML.className = `transaction ${type} row`;
    transactionHTML.innerHTML = `<div class="col-md-7 transaction__details">
                                   <div class="transaction__icon">
                                      <span class="fa fa-money fa-2x"></span>
                                   </div>
                                   <div class="transaction__info">
                                     <h4 class="transaction__title">${item.name}</h4>
                                        <!-- дата -->
                                       <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div class="transaction__summ">
                                        <!--  сумма -->
                                         200 <span class="currency">${item.sum}₽</span>
                                      </div>
                                    </div>
                                 <div class="col-md-2 transaction__controls">
                                    <!-- в data-id нужно поместить id -->
                                   <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                                    <i class="fa fa-trash"></i>  
                                   </button>
                                  </div>`
    return transactionHTML;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const dataArr = data;
    const content = this.element.querySelector(".content");
    const transactionArr = Array.from(content.querySelectorAll(".transaction"));
    if (transactionArr.length > 0) {
      transactionArr.forEach((item) => item.remove())
    };
    if (dataArr.length > 0) {
      dataArr.forEach((item) => {
        content.append(this.getTransactionHTML(item));
      })
    }

  }
}
// const trans = new TransactionsPage;
// trans.formatDate("2019-07-10 03:20:41");
// //C.formatDate("2019-03-10 03:20:41");