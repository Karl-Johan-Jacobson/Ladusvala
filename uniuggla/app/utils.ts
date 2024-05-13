export function addClass(newClass: string, htmlClass: string): void {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).classList.add(newClass);
	});
}

export function removeClass(oldClass: string, htmlClass: string): void {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).classList.remove(oldClass);
	});
}

export function modifyOverflow(Atribute: string, htmlClass: string): void {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).style.overflow = Atribute;
	});
}

export const modifyTopPadding = (newTopPadding: string, htmlClass: string) => {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).style.paddingTop = newTopPadding;
	});
};

export const modifyTopPaddingRelative = (relativePaddingtop: string, htmlClass: string) => {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		var currentPaddingTop = window.getComputedStyle(element).paddingTop;
		var newPaddingTop = "calc(" + currentPaddingTop + " + " + relativePaddingtop + ")";
		(element as HTMLElement).style.paddingTop = newPaddingTop;
	});
};

export const modifyTop = (newTop: string, htmlClass: string) => {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).style.top = newTop;
	});
};

export const modifyHeight = (newHeight: string, htmlClass: string) => {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		(element as HTMLElement).style.height = newHeight;
	});
};

export const modifyHeightRelative = (relativeHeight: string, htmlClass: string) => {
	var elements = document.querySelectorAll("." + htmlClass);
	elements.forEach(function (element) {
		var currentHeight = window.getComputedStyle(element).height;
		var newHeight = "calc(" + currentHeight + " + " + relativeHeight + ")";
		(element as HTMLElement).style.height = newHeight;
	});
};

export function formatNumber(num: number): string {
	num = num / 60;
	const roundedNum = num.toFixed(2);
	return roundedNum.endsWith(".00") ? roundedNum.slice(0, -3) :
	roundedNum.endsWith("0") ? roundedNum.slice(0, -1) : roundedNum;
} 

