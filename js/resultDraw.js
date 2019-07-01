var draw = {
  data: {
    variable: {},
    parse: {}
  },
  initData(parse){
    this.data.parse = parse;
    this.data.variable = {};
  },
  paint(parse) {
    this.initData(parse);
    this.paintVariable(parse);
    this.paintFormula(parse);
    this.paintResult("");
  },
  paintVariable(parse) {
    if (parse.variable.length > 0) {
      var variableListHtml = [];
      variableListHtml.push("<p class='label'>变量：</p>");
      variableListHtml.push("<div class='formulator-variable-list'>");
      for (let i in parse.variable) {
        variableListHtml.push(
          "<div class='formulator-variable-item'><p class='formulator-variable'>" +
            parse.variable[i] +
            "</p>=<input type='number' id='variable-" +
            parse.variable[i] +
            "' /></div>"
        );
      }
      variableListHtml.push("</div>");
      document.getElementById(
        "variable-list"
      ).innerHTML = variableListHtml.join("");
    } else {
      document.getElementById("variable-list").innerHTML = "";
    }
    for (var i in parse.variable) {
      this.addInputListen(i, parse.variable);
    }
  },
  paintFormula(parse) {
    document.getElementById("formula").innerHTML =
      "<p class='label'>计算公式：</p><p class='formular-content'>" +
      parse.content +
      "</p>";
  },
  paintResult(result) {
    document.getElementById("formula-result").innerHTML =
      "<p class='label'>计算结果：</p><p class='formular-content'>" +
      (result ? result : "输入参数后自动计算结果") +
      "</p>";
  },
  addInputListen(index, variable) {
    var _this = this;
    document
      .getElementById("variable-" + variable[index])
      .addEventListener("input", function(e) {
        _this.data.variable[variable[index]] = "" + e.target.value;
        _this.countResult();
      });
  },
  countResult() {
    var variable = this.data.variable,
      parse = this.data.parse,
      formula = parse.formula,
      result = "",
      canCount= true;
    try {
      for (var i in parse.variable) {
        if (!variable[parse.variable[i]]) canCount = false;
      }
      if(canCount){
        for (var i in parse.variable) {
          formula = formula.split("$" + parse.variable[i] + "$").join(variable[parse.variable[i]]);
        }
        result = math.eval(formula);
      }
    } catch (error) {
      console.error(error);
    }
    this.paintResult(result);
  }
};
