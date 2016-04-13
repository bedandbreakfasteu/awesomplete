describe("Awesomplete list", function () {

	$.fixture("plain");
	def("options", {
		list: [
			{ label: "Groningen", value: "126783", group: 0 },
			{ label: "Utrecht", value: "12233", group: 0 },
			{ label: "Groningen", value: "125656", group: 1 },
			{ label: "Utrecht", value: "453435", group: 1 },
			{ label: "Washington", value: "45556", group: 1 }
		],
		groups:["Region","City","Country"]
	});
	def("element", "#plain");

	subject(function () { return new Awesomplete(this.element, this.options) });

	describe("The HTML list", function () {
		it("is is made up out of groups", function () {
			expect(this.subject._ulGroups[0].tagName).toEqual("LI");
			expect(this.subject._ulGroups[1].tagName).toEqual("LI");
		});

		it("contains for each group node the corresponding data-group-id attribute", function () {
			this.subject._ulGroups.forEach(function (ulGroup, index) {
				expect(ulGroup.getAttribute("data-group-id") + '').toBe(index + '');
			}, this);
		});

		it("contains for each group node the role attrbute 'group'", function () {
			this.subject._ulGroups.forEach(function (ulGroup, index) {
				expect(ulGroup.getAttribute("role")).toBe("group");
			}, this);
		});

		it("contains for each group node the role attrbute 'group'", function () {
			this.subject._ulGroups.forEach(function (ulGroup, index) {
				expect(ulGroup.getAttribute("role")).toBe("group");
			}, this);
		});
	});
});
