/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarTogle = document.querySelector(".sidebar-toggle");
    const bodyDoc = document.querySelector(".sidebar-mini");
    sidebarTogle.addEventListener("click", (e) => {
      e.preventDefault();
      bodyDoc.classList.toggle("sidebar-open");
      bodyDoc.classList.toggle("sidebar-collapse");
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const link = Array.from(sidebarMenu.getElementsByTagName("a"));
    link.forEach((element) => {
      element.addEventListener("click", (e) => {
        const perent = e.target.closest(".menu-item");
        if (perent.classList.contains("menu-item_login")) {
          App.getModal("login").open();
        };
        if (perent.classList.contains("menu-item_register")) {
          App.getModal("register").open();
        };
        if (perent.classList.contains("menu-item_logout")) {
          User.logout();
          App.setState('init');
        };
      });

    });


  }
}
// Sidebar.initToggleButton();
