describe("Awesomplete groups", function () {

	$.fixture("options-with-groups");

	subject(function () { return new Awesomplete(this.element, this.options) });

	describe("setter", function () {

		def("element", "#no-options");

		it("assigns from array", function () {
			this.subject.groups = [ "From", "Array" ];
			expect(this.subject._groups).toEqual([ "From", "Array" ]);
		});

		it("assigns from comma separated list", function () {
			this.subject.groups = "From, Inline, List";
			expect(this.subject._groups).toEqual([ "From", "Inline", "List" ]);
		});

		it("assigns from input element with datalist attribute", function () {
			this.subject.groups = $("#list").getAttribute('data-groups');
			expect(this.subject._groups).toEqual([ "Regions", "Cities"]);
		});

		it("assigns from input element with datalist attribute", function () {
			this.subject.groups = $("#list").getAttribute('data-groups');
			expect(this.subject._groups).toEqual([ "Regions", "Cities"]);
		});

		it("does not assign from empty group list", function () {
			this.subject.groups = [];
			expect(this.subject._groups).toEqual([]);
		});
	});
});
