/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
      this.update();
    } else {
      throw new Error("Передан пустой элемент!");
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener("click", (e) => {
      const item = e.target;
      if (item.classList.contains("create-account")) {
        App.getModal("createAccount").open();
      };
      const account = item.closest(".account")
      if (account) {
        this.onSelectAccount(account);
      }
    })

  }


  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list([User.current().id], (e, response) => {
        this.clear();
        this.renderItem(response.data);
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const row = document.querySelector(".accounts-panel");
    const accountArr = Array.from(row.querySelectorAll(".account"));
    if (accountArr.length > 0) {
      accountArr.forEach((item) => item.remove());
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const row = document.querySelector(".accounts-panel");
    const accountArr = Array.from(row.querySelectorAll(".account"));
    const index = accountArr.findIndex((item) => item.classList.contains("active"));
    if (index > -1) {
      accountArr[index].classList.remove("active");
    };
    element.classList.add("active");
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let scoreNode = document.createElement('li');
    scoreNode.className = "account";
    scoreNode.dataset.id = item.id;
    scoreNode.innerHTML = `<a href="#">
                             <span>${item.name}</span> /
                             <span>${item.sum} ₽</span>
                            </a>`;
    return scoreNode;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    const row = document.querySelector(".accounts-panel");
    data.forEach((item) => row.append(this.getAccountHTML(item)))
  }
}
