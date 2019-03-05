import stringify from '../src/stringify'

test('stringify object', () => {
  const input = {
		foo: 'bar \'bar\'',
		foo2: [
			'foo',
			'bar',
			{
				foo: "bar 'bar'"
			}
		],
		'foo-foo': 'bar',
		'2foo': 'bar',
		'@#': "bar",
		$el: 'bar',
		_private: 'bar',
		number: 1,
		boolean: true,
		date: new Date("2014-01-29T22:41:05.665Z"),
		escapedString: "\"\"",
		null: null,
		undefined: undefined,
		fn: function fn() {},
		fn2: function () {},
		fn3: () => {},
		'#@'() {},
		regexp: /./,
		NaN: NaN,
		Infinity: Infinity,
		newlines: "foo\nbar\r\nbaz",
		[Symbol()]: Symbol(), // eslint-disable-line symbol-description
		[Symbol('foo')]: Symbol('foo'),
		[Symbol.for('foo')]: Symbol.for('foo'),
	};
  expect(stringify(input)).toMatchSnapshot()
})
