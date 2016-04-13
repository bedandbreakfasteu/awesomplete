describe("awesomplete.next", function () {

	$.fixture("plain");

	subject(function () {
		return new Awesomplete("#plain", { list: ["item1", "item2", "item3"] });
	});

	def("lastIndex", function () { return this.subject.ul.children.length - 1 });

	describe("without any items found", function () {
		beforeEach(function () {
			$.type(this.subject.input, "nosuchitem");
			this.subject.open();
		});

		it("does not select any item", function () {
			this.subject.next();
			expect(this.subject.index).toBe(-1);
		});
	});

	describe("with some items found", function () {
		beforeEach(function () {
			$.type(this.subject.input, "ite");
			this.subject.open();
		});

		describe("and no item was already selected", function () {
			it("selects the first item ", function () {
				this.subject.next();
				expect(this.subject.index).toBe(0);
			});
		});

		describe("and some item was already selected", function () {
			it("selects the second item", function () {
				this.subject.goto(0);
				this.subject.next();
				expect(this.subject.index).toBe(1);
			});

			it("selects the last item", function () {
				this.subject.goto(this.lastIndex - 1);
				this.subject.next();
				expect(this.subject.index).toBe(this.lastIndex);
			});

			it("selects no item after reaching the end", function () {
				this.subject.goto(this.lastIndex);
				this.subject.next();
				expect(this.subject.index).toBe(-1);
			});
		});

		describe("with groups and some items found", function () {
			beforeEach(function () {
				$.type(this.subject.input, "tre");
				this.subject.list = [
					{ label: "Treter", value: "126783", group: 0 },
					{ label: "Utrecht", value: "12233", group: 0 },
					{ label: "Groningen", value: "125656", group: 1 },
					{ label: "Utrecht", value: "453435", group: 1 },
					{ label: "Washington", value: "45556", group: 1 }
				];
				this.subject.groups = ["Region","City","Country"];
				this.subject.evaluate();
			});


			describe("and last item of group was selected, moving to the next group", function () {
				it("selects the second item", function () {
					this.subject.goto(1);
					this.subject.next();
					expect(this.subject.ul.querySelectorAll('li.suggestion')[2].getAttribute('aria-selected')).toBe('true');
				});
			});
		});
	});
});
