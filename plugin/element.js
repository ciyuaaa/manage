import Vue from 'vue'

import {
    Button,
    Input,
    Form,
    FormItem,
    Message,
  } from 'element-ui';
  
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.prototype.$message = Message;
  Vue.config.productionTip = false
  