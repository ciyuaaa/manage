import Vue from 'vue'
import {
    Button,
    Input,
    Form,
    FormItem,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Select,
    Option
  } from 'element-ui'
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(MenuItemGroup)
  Vue.use(Submenu)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Card)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Switch)  
  Vue.use(Pagination)
  Vue.use(Dialog)
  Vue.use(Tag)
  Vue.use(Tree)
  Vue.use(Select)
  Vue.use(Option)
  Vue.prototype.$message = Message;
  Vue.prototype.$confirm = MessageBox.confirm;
  