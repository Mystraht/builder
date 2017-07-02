package com.isartdigital.builder.ui;

import com.isartdigital.utils.Localization;
import js.Browser;
import js.html.DivElement;

class Footer {
	private var footer:DivElement;

	public function new() {
		footer = createFooter();
		Browser.document.body.appendChild(footer);
	}

	public function getFooterElement():DivElement {
		if (footer == null) {
			throw footerNotDefinedException();
		}
		return footer;
	}

	private function createFooter():DivElement {
		var lDiv:DivElement = cast(Browser.document.createElement("div"), DivElement);
		lDiv.style.textAlign = "center";
		lDiv.style.verticalAlign = "center" ;
		lDiv.style.fontFamily = "Verdana,Arial,sans-serif"; lDiv.style.color = "#000000";
		lDiv.style.fontSize = "12px";
		lDiv.style.margin = "0";
		lDiv.style.padding = "0";
		lDiv.innerHTML = Localization.getText("label_footer_pub");
		return lDiv;
	}

	private function footerNotDefinedException():String {
		return 'Footer.hx : you try to get footer but it was not defined';
	}
}
