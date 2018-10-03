module.exports = function (source, map) {
  this.callback(
    null,
    `export default function (Component) {
      Component.options.__data__block__ = ${source.trim()}
    }`,
    map
  )
}
