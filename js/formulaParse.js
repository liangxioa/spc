var formula = {
  // 内容解析
  parse(content) {
    var variable = this.getVariable(content);
    var formula = this.getFormula(variable, content);
    var result = {
      variable: variable,
      formula: formula.formula,
      content: formula.content
    };
    return result;
  },
  //提取变量
  getVariable(content) {
    var regex = /\$(.+?)\$/g,
      temp,
      variable = [];
    try {
      while ((temp = regex.exec(content)) != null) {
        if (variable.length > 0) {
          let has = false;
          for (var i in variable) {
            if (variable[i] == temp[1]) has = true;
          }
          if (!has) variable.push(temp[1]);
        } else {
          variable.push(temp[1]);
        }
      }
    } catch (error) {
      console.error(error);
    }
    return variable;
  },
  //提取公式
  getFormula(variable, content) {
    var formula = content;
    try {
      for (var i = 0; i < variable.length; i++) {
        content = content.split("$" + variable[i] + "$").join(variable[i]);
      }
    } catch (error) {
      console.error(error);
    }
    return {
      formula: formula,
      content: content
    };
  }
};
