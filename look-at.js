! function(t) {
  function e(n) {
    if (o[n]) return o[n].exports;
    var r = o[n] = {
      exports: {},
      id: n,
      loaded: !1
    };
    return t[n].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
  }
  var o = {};
  return e.m = t, e.c = o, e.p = "", e(0)
}([function(t, e) {
  var o = AFRAME.utils.debug,
    n = AFRAME.utils.coordinates,
    r = o("components:look-at:warn"),
    i = n.isCoordinates || n.isCoordinate;
  delete AFRAME.components["look-at"], AFRAME.registerComponent("look-at", {
    schema: {
      default: "",
      parse: function(t) {
        return i(t) || "object" == typeof t ? n.parse(t) : t
      },
      stringify: function(t) {
        return "object" == typeof t ? n.stringify(t) : t
      }
    },
    init: function() {
      this.target3D = null, this.vector = new THREE.Vector3
    },
    update: function() {
      var t, e = this,
        o = e.data,
        n = e.el.object3D;
      return !o || "object" == typeof o && !Object.keys(o).length ? e.remove() : "object" == typeof o ? n.lookAt(new THREE.Vector3(o.x, o.y, o.z)) : (t = e.el.sceneEl.querySelector(o), t ? t.hasLoaded ? e.beginTracking(t) : t.addEventListener("loaded", function() {
        e.beginTracking(t)
      }) : void r('"' + o + '" does not point to a valid entity to look-at'))
    },
    tick: function() {
      var t = new THREE.Vector3;
      return function(e) {
        var o = this.target3D,
          n = this.el.object3D,
          r = this.vector;
        o && (n.parent.worldToLocal(o.getWorldPosition(t)), this.el.getObject3D("camera") ? r.subVectors(n.position, t).add(n.position) : r = t, n.lookAt(r))
      }
    }(),
    beginTracking: function(t) {
      this.target3D = t.object3D
    }
  })
}]);
