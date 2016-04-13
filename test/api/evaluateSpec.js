describe("awesomplete.evaluate", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	describe("with too short input value", function () {
		beforeEach(function () {
			$.type(this.subject.input, "i");
		});

		it("closes completer", function () {
			spyOn(this.subject, "close");
			this.subject.evaluate();

			expect(this.subject.close).toHaveBeenCalled();
		});
	});

	describe("with no items found", function () {
		beforeEach(function () {
			$.type(this.subject.input, "nosuchitem");
		});

		it("closes completer", function () {
			spyOn(this.subject, "close");
			this.subject.evaluate();

			expect(this.subject.close).toHaveBeenCalled();
		});
	});

	describe("with some items found", function () {
		beforeEach(function () {
			$.type(this.subject.input, "ite");
		});

		it("opens completer", function () {
			spyOn(this.subject, "open");
			this.subject.evaluate();

			expect(this.subject.open).toHaveBeenCalled();
		});

		it("fills completer with found items", function () {
			this.subject.evaluate();
			expect(this.subject.ul.children.length).toBe(3);
		});

		it("shows no more than maxItems", function () {
			this.subject.maxItems = 2;
			this.subject.evaluate();
			expect(this.subject.ul.children.length).toBe(2);
		});

		it("makes no item selected", function () {
			this.subject.evaluate();
			expect(this.subject.index).toBe(-1);
		});
	});

	describe("with minChars: 0", function () {
		beforeEach(function () {
			this.subject.minChars = 0;
		});

		it("opens completer", function () {
			spyOn(this.subject, "open");
			this.subject.evaluate();

			expect(this.subject.open).toHaveBeenCalled();
		});

		it("fills completer with all items", function () {
			this.subject.evaluate();
			expect(this.subject.ul.children.length).toBe(3);
		});

		it("shows no more than maxItems", function () {
			this.subject.maxItems = 2;
			this.subject.evaluate();
			expect(this.subject.ul.children.length).toBe(2);
		});

		it("makes no item selected", function () {
			this.subject.evaluate();
			expect(this.subject.index).toBe(-1);
		});
	});

	describe("with groups", function () {
		beforeEach(function () {
			$.type(this.subject.input, "tre");
			this.subject.list = [
				{ label: "Groningen", value: "126783", group: 0 },
				{ label: "Utrecht", value: "12233", group: 0 },
				{ label: "Groningen", value: "125656", group: 1 },
				{ label: "Utrecht", value: "453435", group: 1 },
				{ label: "Washington", value: "45556", group: 1 }
			];
			this.subject.groups = ["Region","City","Country"];
		});

		it("fills completer with all items grouped", function () {
			this.subject.evaluate();
			for (var i = 0; i < this.subject.ul.children.length; i++) {
				var group = this.subject.ul.children[i];
				expect(group.tagName).toBe('LI');
				expect(group.children[0].tagName).toBe('UL');
			}
		});

		it("hides groups that have no results", function () {
			this.subject.evaluate();
			expect(this.subject._ulGroups[0].querySelectorAll('ul > li.suggestion').length).toBeGreaterThan(0);
			expect(this.subject._ulGroups[1].querySelectorAll('ul > li.suggestion').length).toBeGreaterThan(0);
			expect(this.subject._ulGroups[2].querySelectorAll('ul > li.suggestion').length).toBe(0);
		});
	});
});
