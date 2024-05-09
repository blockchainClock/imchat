function Br(i, e) {
  for (var t = 0; t < e.length; t++) {
    const n = e[t];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const s in n)
        if (s !== "default" && !(s in i)) {
          const r = Object.getOwnPropertyDescriptor(n, s);
          r && Object.defineProperty(i, s, r.get ? r : {
            enumerable: !0,
            get: () => n[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }));
}
function F(i, e) {
  if (!i)
    throw new Error(e);
}
const Vr = 34028234663852886e22, qr = -34028234663852886e22, Kr = 4294967295, jr = 2147483647, Gr = -2147483648;
function Pt(i) {
  if (typeof i != "number")
    throw new Error("invalid int 32: " + typeof i);
  if (!Number.isInteger(i) || i > jr || i < Gr)
    throw new Error("invalid int 32: " + i);
}
function li(i) {
  if (typeof i != "number")
    throw new Error("invalid uint 32: " + typeof i);
  if (!Number.isInteger(i) || i > Kr || i < 0)
    throw new Error("invalid uint 32: " + i);
}
function zn(i) {
  if (typeof i != "number")
    throw new Error("invalid float 32: " + typeof i);
  if (Number.isFinite(i) && (i > Vr || i < qr))
    throw new Error("invalid float 32: " + i);
}
const Wn = Symbol("@bufbuild/protobuf/enum-type");
function Hr(i) {
  const e = i[Wn];
  return F(e, "missing enum type on enum object"), e;
}
function Jn(i, e, t, n) {
  i[Wn] = Qn(e, t.map((s) => ({
    no: s.no,
    name: s.name,
    localName: i[s.no]
  })));
}
function Qn(i, e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null), r = [];
  for (const a of e) {
    const o = $n(a);
    r.push(o), n[a.name] = o, s[a.no] = o;
  }
  return {
    typeName: i,
    values: r,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(a) {
      return n[a];
    },
    findNumber(a) {
      return s[a];
    }
  };
}
function zr(i, e, t) {
  const n = {};
  for (const s of e) {
    const r = $n(s);
    n[r.localName] = r.no, n[r.no] = r.localName;
  }
  return Jn(n, i, e), n;
}
function $n(i) {
  return "localName" in i ? i : Object.assign(Object.assign({}, i), {
    localName: i.name
  });
}
class Yn {
  /**
   * Compare with a message of the same type.
   * Note that this function disregards extensions and unknown fields.
   */
  equals(e) {
    return this.getType().runtime.util.equals(this.getType(), this, e);
  }
  /**
   * Create a deep copy.
   */
  clone() {
    return this.getType().runtime.util.clone(this);
  }
  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(e, t) {
    const n = this.getType(), s = n.runtime.bin, r = s.makeReadOptions(t);
    return s.readMessage(this, r.readerFactory(e), e.byteLength, r), this;
  }
  /**
   * Parse a message from a JSON value.
   */
  fromJson(e, t) {
    const n = this.getType(), s = n.runtime.json, r = s.makeReadOptions(t);
    return s.readMessage(n, e, r, this), this;
  }
  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(e, t) {
    let n;
    try {
      n = JSON.parse(e);
    } catch (s) {
      throw new Error("cannot decode ".concat(this.getType().typeName, " from JSON: ").concat(s instanceof Error ? s.message : String(s)));
    }
    return this.fromJson(n, t);
  }
  /**
   * Serialize the message to binary data.
   */
  toBinary(e) {
    const t = this.getType(), n = t.runtime.bin, s = n.makeWriteOptions(e), r = s.writerFactory();
    return n.writeMessage(this, r, s), r.finish();
  }
  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(e) {
    const t = this.getType(), n = t.runtime.json, s = n.makeWriteOptions(e);
    return n.writeMessage(this, s);
  }
  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(e) {
    var t;
    const n = this.toJson(e);
    return JSON.stringify(n, null, (t = e == null ? void 0 : e.prettySpaces) !== null && t !== void 0 ? t : 0);
  }
  /**
   * Override for serialization behavior. This will be invoked when calling
   * JSON.stringify on this message (i.e. JSON.stringify(msg)).
   *
   * Note that this will not serialize google.protobuf.Any with a packed
   * message because the protobuf JSON format specifies that it needs to be
   * unpacked, and this is only possible with a type registry to look up the
   * message type.  As a result, attempting to serialize a message with this
   * type will throw an Error.
   *
   * This method is protected because you should not need to invoke it
   * directly -- instead use JSON.stringify or toJsonString for
   * stringified JSON.  Alternatively, if actual JSON is desired, you should
   * use toJson.
   */
  toJSON() {
    return this.toJson({
      emitDefaultValues: !0
    });
  }
  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType() {
    return Object.getPrototypeOf(this).constructor;
  }
}
function Wr(i, e, t, n) {
  var s;
  const r = (s = n == null ? void 0 : n.localName) !== null && s !== void 0 ? s : e.substring(e.lastIndexOf(".") + 1), a = {
    [r]: function(o) {
      i.util.initFields(this), i.util.initPartial(o, this);
    }
  }[r];
  return Object.setPrototypeOf(a.prototype, new Yn()), Object.assign(a, {
    runtime: i,
    typeName: e,
    fields: i.util.newFieldList(t),
    fromBinary(o, c) {
      return new a().fromBinary(o, c);
    },
    fromJson(o, c) {
      return new a().fromJson(o, c);
    },
    fromJsonString(o, c) {
      return new a().fromJsonString(o, c);
    },
    equals(o, c) {
      return i.util.equals(a, o, c);
    }
  }), a;
}
function Jr() {
  let i = 0, e = 0;
  for (let n = 0; n < 28; n += 7) {
    let s = this.buf[this.pos++];
    if (i |= (s & 127) << n, !(s & 128))
      return this.assertBounds(), [i, e];
  }
  let t = this.buf[this.pos++];
  if (i |= (t & 15) << 28, e = (t & 112) >> 4, !(t & 128))
    return this.assertBounds(), [i, e];
  for (let n = 3; n <= 31; n += 7) {
    let s = this.buf[this.pos++];
    if (e |= (s & 127) << n, !(s & 128))
      return this.assertBounds(), [i, e];
  }
  throw new Error("invalid varint");
}
function Yt(i, e, t) {
  for (let r = 0; r < 28; r = r + 7) {
    const a = i >>> r, o = !(!(a >>> 7) && e == 0), c = (o ? a | 128 : a) & 255;
    if (t.push(c), !o)
      return;
  }
  const n = i >>> 28 & 15 | (e & 7) << 4, s = !!(e >> 3);
  if (t.push((s ? n | 128 : n) & 255), !!s) {
    for (let r = 3; r < 31; r = r + 7) {
      const a = e >>> r, o = !!(a >>> 7), c = (o ? a | 128 : a) & 255;
      if (t.push(c), !o)
        return;
    }
    t.push(e >>> 31 & 1);
  }
}
const wt = 4294967296;
function en(i) {
  const e = i[0] === "-";
  e && (i = i.slice(1));
  const t = 1e6;
  let n = 0, s = 0;
  function r(a, o) {
    const c = Number(i.slice(a, o));
    s *= t, n = n * t + c, n >= wt && (s = s + (n / wt | 0), n = n % wt);
  }
  return r(-24, -18), r(-18, -12), r(-12, -6), r(-6), e ? Zn(n, s) : Ni(n, s);
}
function Qr(i, e) {
  let t = Ni(i, e);
  const n = t.hi & 2147483648;
  n && (t = Zn(t.lo, t.hi));
  const s = Xn(t.lo, t.hi);
  return n ? "-" + s : s;
}
function Xn(i, e) {
  if ({
    lo: i,
    hi: e
  } = $r(i, e), e <= 2097151)
    return String(wt * e + i);
  const t = i & 16777215, n = (i >>> 24 | e << 8) & 16777215, s = e >> 16 & 65535;
  let r = t + n * 6777216 + s * 6710656, a = n + s * 8147497, o = s * 2;
  const c = 1e7;
  return r >= c && (a += Math.floor(r / c), r %= c), a >= c && (o += Math.floor(a / c), a %= c), o.toString() + tn(a) + tn(r);
}
function $r(i, e) {
  return {
    lo: i >>> 0,
    hi: e >>> 0
  };
}
function Ni(i, e) {
  return {
    lo: i | 0,
    hi: e | 0
  };
}
function Zn(i, e) {
  return e = ~e, i ? i = ~i + 1 : e += 1, Ni(i, e);
}
const tn = (i) => {
  const e = String(i);
  return "0000000".slice(e.length) + e;
};
function nn(i, e) {
  if (i >= 0) {
    for (; i > 127; )
      e.push(i & 127 | 128), i = i >>> 7;
    e.push(i);
  } else {
    for (let t = 0; t < 9; t++)
      e.push(i & 127 | 128), i = i >> 7;
    e.push(1);
  }
}
function Yr() {
  let i = this.buf[this.pos++], e = i & 127;
  if (!(i & 128))
    return this.assertBounds(), e;
  if (i = this.buf[this.pos++], e |= (i & 127) << 7, !(i & 128))
    return this.assertBounds(), e;
  if (i = this.buf[this.pos++], e |= (i & 127) << 14, !(i & 128))
    return this.assertBounds(), e;
  if (i = this.buf[this.pos++], e |= (i & 127) << 21, !(i & 128))
    return this.assertBounds(), e;
  i = this.buf[this.pos++], e |= (i & 15) << 28;
  for (let t = 5; i & 128 && t < 10; t++)
    i = this.buf[this.pos++];
  if (i & 128)
    throw new Error("invalid varint");
  return this.assertBounds(), e >>> 0;
}
function Xr() {
  const i = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof i.getBigInt64 == "function" && typeof i.getBigUint64 == "function" && typeof i.setBigInt64 == "function" && typeof i.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const s = BigInt("-9223372036854775808"), r = BigInt("9223372036854775807"), a = BigInt("0"), o = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(c) {
        const d = typeof c == "bigint" ? c : BigInt(c);
        if (d > r || d < s)
          throw new Error("int64 invalid: ".concat(c));
        return d;
      },
      uParse(c) {
        const d = typeof c == "bigint" ? c : BigInt(c);
        if (d > o || d < a)
          throw new Error("uint64 invalid: ".concat(c));
        return d;
      },
      enc(c) {
        return i.setBigInt64(0, this.parse(c), !0), {
          lo: i.getInt32(0, !0),
          hi: i.getInt32(4, !0)
        };
      },
      uEnc(c) {
        return i.setBigInt64(0, this.uParse(c), !0), {
          lo: i.getInt32(0, !0),
          hi: i.getInt32(4, !0)
        };
      },
      dec(c, d) {
        return i.setInt32(0, c, !0), i.setInt32(4, d, !0), i.getBigInt64(0, !0);
      },
      uDec(c, d) {
        return i.setInt32(0, c, !0), i.setInt32(4, d, !0), i.getBigUint64(0, !0);
      }
    };
  }
  const t = (s) => F(/^-?[0-9]+$/.test(s), "int64 invalid: ".concat(s)), n = (s) => F(/^[0-9]+$/.test(s), "uint64 invalid: ".concat(s));
  return {
    zero: "0",
    supported: !1,
    parse(s) {
      return typeof s != "string" && (s = s.toString()), t(s), s;
    },
    uParse(s) {
      return typeof s != "string" && (s = s.toString()), n(s), s;
    },
    enc(s) {
      return typeof s != "string" && (s = s.toString()), t(s), en(s);
    },
    uEnc(s) {
      return typeof s != "string" && (s = s.toString()), n(s), en(s);
    },
    dec(s, r) {
      return Qr(s, r);
    },
    uDec(s, r) {
      return Xn(s, r);
    }
  };
}
const j = Xr();
var m;
(function(i) {
  i[i.DOUBLE = 1] = "DOUBLE", i[i.FLOAT = 2] = "FLOAT", i[i.INT64 = 3] = "INT64", i[i.UINT64 = 4] = "UINT64", i[i.INT32 = 5] = "INT32", i[i.FIXED64 = 6] = "FIXED64", i[i.FIXED32 = 7] = "FIXED32", i[i.BOOL = 8] = "BOOL", i[i.STRING = 9] = "STRING", i[i.BYTES = 12] = "BYTES", i[i.UINT32 = 13] = "UINT32", i[i.SFIXED32 = 15] = "SFIXED32", i[i.SFIXED64 = 16] = "SFIXED64", i[i.SINT32 = 17] = "SINT32", i[i.SINT64 = 18] = "SINT64";
})(m || (m = {}));
var Se;
(function(i) {
  i[i.BIGINT = 0] = "BIGINT", i[i.STRING = 1] = "STRING";
})(Se || (Se = {}));
function ye(i, e, t) {
  if (e === t)
    return !0;
  if (i == m.BYTES) {
    if (!(e instanceof Uint8Array) || !(t instanceof Uint8Array) || e.length !== t.length)
      return !1;
    for (let n = 0; n < e.length; n++)
      if (e[n] !== t[n])
        return !1;
    return !0;
  }
  switch (i) {
    case m.UINT64:
    case m.FIXED64:
    case m.INT64:
    case m.SFIXED64:
    case m.SINT64:
      return e == t;
  }
  return !1;
}
function Je(i, e) {
  switch (i) {
    case m.BOOL:
      return !1;
    case m.UINT64:
    case m.FIXED64:
    case m.INT64:
    case m.SFIXED64:
    case m.SINT64:
      return e == 0 ? j.zero : "0";
    case m.DOUBLE:
    case m.FLOAT:
      return 0;
    case m.BYTES:
      return new Uint8Array(0);
    case m.STRING:
      return "";
    default:
      return 0;
  }
}
function es(i, e) {
  switch (i) {
    case m.BOOL:
      return e === !1;
    case m.STRING:
      return e === "";
    case m.BYTES:
      return e instanceof Uint8Array && !e.byteLength;
    default:
      return e == 0;
  }
}
var B;
(function(i) {
  i[i.Varint = 0] = "Varint", i[i.Bit64 = 1] = "Bit64", i[i.LengthDelimited = 2] = "LengthDelimited", i[i.StartGroup = 3] = "StartGroup", i[i.EndGroup = 4] = "EndGroup", i[i.Bit32 = 5] = "Bit32";
})(B || (B = {}));
class Zr {
  constructor(e) {
    this.stack = [], this.textEncoder = e != null ? e : new TextEncoder(), this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.chunks.push(new Uint8Array(this.buf));
    let e = 0;
    for (let s = 0; s < this.chunks.length; s++)
      e += this.chunks[s].length;
    let t = new Uint8Array(e), n = 0;
    for (let s = 0; s < this.chunks.length; s++)
      t.set(this.chunks[s], n), n += this.chunks[s].length;
    return this.chunks = [], t;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    return this.stack.push({
      chunks: this.chunks,
      buf: this.buf
    }), this.chunks = [], this.buf = [], this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let e = this.finish(), t = this.stack.pop();
    if (!t)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = t.chunks, this.buf = t.buf, this.uint32(e.byteLength), this.raw(e);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(e, t) {
    return this.uint32((e << 3 | t) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(e) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(e), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(e) {
    for (li(e); e > 127; )
      this.buf.push(e & 127 | 128), e = e >>> 7;
    return this.buf.push(e), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(e) {
    return Pt(e), nn(e, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(e) {
    return this.buf.push(e ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(e) {
    return this.uint32(e.byteLength), this.raw(e);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(e) {
    let t = this.textEncoder.encode(e);
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(e) {
    zn(e);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setFloat32(0, e, !0), this.raw(t);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(e) {
    let t = new Uint8Array(8);
    return new DataView(t.buffer).setFloat64(0, e, !0), this.raw(t);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(e) {
    li(e);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setUint32(0, e, !0), this.raw(t);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(e) {
    Pt(e);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setInt32(0, e, !0), this.raw(t);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(e) {
    return Pt(e), e = (e << 1 ^ e >> 31) >>> 0, nn(e, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(e) {
    let t = new Uint8Array(8), n = new DataView(t.buffer), s = j.enc(e);
    return n.setInt32(0, s.lo, !0), n.setInt32(4, s.hi, !0), this.raw(t);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(e) {
    let t = new Uint8Array(8), n = new DataView(t.buffer), s = j.uEnc(e);
    return n.setInt32(0, s.lo, !0), n.setInt32(4, s.hi, !0), this.raw(t);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(e) {
    let t = j.enc(e);
    return Yt(t.lo, t.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(e) {
    let t = j.enc(e), n = t.hi >> 31, s = t.lo << 1 ^ n, r = (t.hi << 1 | t.lo >>> 31) ^ n;
    return Yt(s, r, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(e) {
    let t = j.uEnc(e);
    return Yt(t.lo, t.hi, this.buf), this;
  }
}
class ea {
  constructor(e, t) {
    this.varint64 = Jr, this.uint32 = Yr, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength), this.textDecoder = t != null ? t : new TextDecoder();
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let e = this.uint32(), t = e >>> 3, n = e & 7;
    if (t <= 0 || n < 0 || n > 5)
      throw new Error("illegal tag: field no " + t + " wire type " + n);
    return [t, n];
  }
  /**
   * Skip one element on the wire and return the skipped data.
   * Supports WireType.StartGroup since v2.0.0-alpha.23.
   */
  skip(e) {
    let t = this.pos;
    switch (e) {
      case B.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      case B.Bit64:
        this.pos += 4;
      case B.Bit32:
        this.pos += 4;
        break;
      case B.LengthDelimited:
        let n = this.uint32();
        this.pos += n;
        break;
      case B.StartGroup:
        let s;
        for (; (s = this.tag()[1]) !== B.EndGroup; )
          this.skip(s);
        break;
      default:
        throw new Error("cant skip wire type " + e);
    }
    return this.assertBounds(), this.buf.subarray(t, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let e = this.uint32();
    return e >>> 1 ^ -(e & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return j.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return j.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [e, t] = this.varint64(), n = -(e & 1);
    return e = (e >>> 1 | (t & 1) << 31) ^ n, t = t >>> 1 ^ n, j.dec(e, t);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [e, t] = this.varint64();
    return e !== 0 || t !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return j.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return j.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, !0);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let e = this.uint32(), t = this.pos;
    return this.pos += e, this.assertBounds(), this.buf.subarray(t, t + e);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.textDecoder.decode(this.bytes());
  }
}
function ta(i, e, t, n) {
  let s;
  return {
    typeName: e,
    extendee: t,
    get field() {
      if (!s) {
        const r = typeof n == "function" ? n() : n;
        r.name = e.split(".").pop(), r.jsonName = "[".concat(e, "]"), s = i.util.newFieldList([r]).list()[0];
      }
      return s;
    },
    runtime: i
  };
}
function ts(i) {
  const e = i.field.localName, t = /* @__PURE__ */ Object.create(null);
  return t[e] = ia(i), [t, () => t[e]];
}
function ia(i) {
  const e = i.field;
  if (e.repeated)
    return [];
  if (e.default !== void 0)
    return e.default;
  switch (e.kind) {
    case "enum":
      return e.T.values[0].no;
    case "scalar":
      return Je(e.T, e.L);
    case "message":
      const t = e.T, n = new t();
      return t.fieldWrapper ? t.fieldWrapper.unwrapField(n) : n;
    case "map":
      throw "map fields are not allowed to be extensions";
  }
}
function na(i, e) {
  if (!e.repeated && (e.kind == "enum" || e.kind == "scalar")) {
    for (let t = i.length - 1; t >= 0; --t)
      if (i[t].no == e.no)
        return [i[t]];
    return [];
  }
  return i.filter((t) => t.no === e.no);
}
let pe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), Gt = [];
for (let i = 0; i < pe.length; i++)
  Gt[pe[i].charCodeAt(0)] = i;
Gt[45] = pe.indexOf("+");
Gt[95] = pe.indexOf("/");
const is = {
  /**
   * Decodes a base64 string to a byte array.
   *
   * - ignores white-space, including line breaks and tabs
   * - allows inner padding (can decode concatenated base64 strings)
   * - does not require padding
   * - understands base64url encoding:
   *   "-" instead of "+",
   *   "_" instead of "/",
   *   no padding
   */
  dec(i) {
    let e = i.length * 3 / 4;
    i[i.length - 2] == "=" ? e -= 2 : i[i.length - 1] == "=" && (e -= 1);
    let t = new Uint8Array(e), n = 0, s = 0, r, a = 0;
    for (let o = 0; o < i.length; o++) {
      if (r = Gt[i.charCodeAt(o)], r === void 0)
        switch (i[o]) {
          case "=":
            s = 0;
          case `
`:
          case "\r":
          case "	":
          case " ":
            continue;
          default:
            throw Error("invalid base64 string.");
        }
      switch (s) {
        case 0:
          a = r, s = 1;
          break;
        case 1:
          t[n++] = a << 2 | (r & 48) >> 4, a = r, s = 2;
          break;
        case 2:
          t[n++] = (a & 15) << 4 | (r & 60) >> 2, a = r, s = 3;
          break;
        case 3:
          t[n++] = (a & 3) << 6 | r, s = 0;
          break;
      }
    }
    if (s == 1)
      throw Error("invalid base64 string.");
    return t.subarray(0, n);
  },
  /**
   * Encode a byte array to a base64 string.
   */
  enc(i) {
    let e = "", t = 0, n, s = 0;
    for (let r = 0; r < i.length; r++)
      switch (n = i[r], t) {
        case 0:
          e += pe[n >> 2], s = (n & 3) << 4, t = 1;
          break;
        case 1:
          e += pe[s | n >> 4], s = (n & 15) << 2, t = 2;
          break;
        case 2:
          e += pe[s | n >> 6], e += pe[n & 63], t = 0;
          break;
      }
    return t && (e += pe[s], e += "=", t == 1 && (e += "=")), e;
  }
};
function sa(i, e, t) {
  ss(e, i);
  const n = e.runtime.bin.makeReadOptions(t), s = na(i.getType().runtime.bin.listUnknownFields(i), e.field), [r, a] = ts(e);
  for (const o of s)
    e.runtime.bin.readField(r, n.readerFactory(o.data), e.field, o.wireType, n);
  return a();
}
function ra(i, e, t, n) {
  ss(e, i);
  const s = e.runtime.bin.makeReadOptions(n), r = e.runtime.bin.makeWriteOptions(n);
  if (ns(i, e)) {
    const d = i.getType().runtime.bin.listUnknownFields(i).filter((l) => l.no != e.field.no);
    i.getType().runtime.bin.discardUnknownFields(i);
    for (const l of d)
      i.getType().runtime.bin.onUnknownField(i, l.no, l.wireType, l.data);
  }
  const a = r.writerFactory();
  let o = e.field;
  !o.opt && !o.repeated && (o.kind == "enum" || o.kind == "scalar") && (o = Object.assign(Object.assign({}, e.field), {
    opt: !0
  })), e.runtime.bin.writeField(o, t, a, r);
  const c = s.readerFactory(a.finish());
  for (; c.pos < c.len; ) {
    const [d, l] = c.tag(), u = c.skip(l);
    i.getType().runtime.bin.onUnknownField(i, d, l, u);
  }
}
function ns(i, e) {
  const t = i.getType();
  return e.extendee.typeName === t.typeName && !!t.runtime.bin.listUnknownFields(i).find((n) => n.no == e.field.no);
}
function ss(i, e) {
  F(i.extendee.typeName == e.getType().typeName, "extension ".concat(i.typeName, " can only be applied to message ").concat(i.extendee.typeName));
}
function rs(i, e) {
  const t = i.localName;
  if (i.repeated)
    return e[t].length > 0;
  if (i.oneof)
    return e[i.oneof.localName].case === t;
  switch (i.kind) {
    case "enum":
    case "scalar":
      return i.opt || i.req ? e[t] !== void 0 : i.kind == "enum" ? e[t] !== i.T.values[0].no : !es(i.T, e[t]);
    case "message":
      return e[t] !== void 0;
    case "map":
      return Object.keys(e[t]).length > 0;
  }
}
function sn(i, e) {
  const t = i.localName, n = !i.opt && !i.req;
  if (i.repeated)
    e[t] = [];
  else if (i.oneof)
    e[i.oneof.localName] = {
      case: void 0
    };
  else
    switch (i.kind) {
      case "map":
        e[t] = {};
        break;
      case "enum":
        e[t] = n ? i.T.values[0].no : void 0;
        break;
      case "scalar":
        e[t] = n ? Je(i.T, i.L) : void 0;
        break;
      case "message":
        e[t] = void 0;
        break;
    }
}
function Re(i, e) {
  if (i === null || typeof i != "object" || !Object.getOwnPropertyNames(Yn.prototype).every((n) => n in i && typeof i[n] == "function"))
    return !1;
  const t = i.getType();
  return t === null || typeof t != "function" || !("typeName" in t) || typeof t.typeName != "string" ? !1 : e === void 0 ? !0 : t.typeName == e.typeName;
}
function as(i, e) {
  return Re(e) || !i.fieldWrapper ? e : i.fieldWrapper.wrapField(e);
}
m.DOUBLE, m.FLOAT, m.INT64, m.UINT64, m.INT32, m.UINT32, m.BOOL, m.STRING, m.BYTES;
const rn = {
  ignoreUnknownFields: !1
}, an = {
  emitDefaultValues: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1,
  prettySpaces: 0
};
function aa(i) {
  return i ? Object.assign(Object.assign({}, rn), i) : rn;
}
function oa(i) {
  return i ? Object.assign(Object.assign({}, an), i) : an;
}
const Bt = Symbol(), Et = Symbol();
function ca() {
  return {
    makeReadOptions: aa,
    makeWriteOptions: oa,
    readMessage(i, e, t, n) {
      if (e == null || Array.isArray(e) || typeof e != "object")
        throw new Error("cannot decode message ".concat(i.typeName, " from JSON: ").concat(oe(e)));
      n = n != null ? n : new i();
      const s = /* @__PURE__ */ new Map(), r = t.typeRegistry;
      for (const [a, o] of Object.entries(e)) {
        const c = i.fields.findJsonName(a);
        if (c) {
          if (c.oneof) {
            if (o === null && c.kind == "scalar")
              continue;
            const d = s.get(c.oneof);
            if (d !== void 0)
              throw new Error("cannot decode message ".concat(i.typeName, ' from JSON: multiple keys for oneof "').concat(c.oneof.name, '" present: "').concat(d, '", "').concat(a, '"'));
            s.set(c.oneof, a);
          }
          on(n, o, c, t, i);
        } else {
          let d = !1;
          if (r != null && r.findExtension && a.startsWith("[") && a.endsWith("]")) {
            const l = r.findExtension(a.substring(1, a.length - 1));
            if (l && l.extendee.typeName == i.typeName) {
              d = !0;
              const [u, p] = ts(l);
              on(u, o, l.field, t, l), ra(n, l, p(), t);
            }
          }
          if (!d && !t.ignoreUnknownFields)
            throw new Error("cannot decode message ".concat(i.typeName, ' from JSON: key "').concat(a, '" is unknown'));
        }
      }
      return n;
    },
    writeMessage(i, e) {
      const t = i.getType(), n = {};
      let s;
      try {
        for (s of t.fields.byNumber()) {
          if (!rs(s, i)) {
            if (s.req)
              throw "required field not set";
            if (!e.emitDefaultValues || !la(s))
              continue;
          }
          const a = s.oneof ? i[s.oneof.localName].value : i[s.localName], o = cn(s, a, e);
          o !== void 0 && (n[e.useProtoFieldName ? s.name : s.jsonName] = o);
        }
        const r = e.typeRegistry;
        if (r != null && r.findExtensionFor)
          for (const a of t.runtime.bin.listUnknownFields(i)) {
            const o = r.findExtensionFor(t.typeName, a.no);
            if (o && ns(i, o)) {
              const c = sa(i, o, e), d = cn(o.field, c, e);
              d !== void 0 && (n[o.field.jsonName] = d);
            }
          }
      } catch (r) {
        const a = s ? "cannot encode field ".concat(t.typeName, ".").concat(s.name, " to JSON") : "cannot encode message ".concat(t.typeName, " to JSON"), o = r instanceof Error ? r.message : String(r);
        throw new Error(a + (o.length > 0 ? ": ".concat(o) : ""));
      }
      return n;
    },
    readScalar(i, e, t) {
      return dt(i, e, t != null ? t : Se.BIGINT, !0);
    },
    writeScalar(i, e, t) {
      if (e !== void 0 && (t || es(i, e)))
        return Rt(i, e);
    },
    debug: oe
  };
}
function oe(i) {
  if (i === null)
    return "null";
  switch (typeof i) {
    case "object":
      return Array.isArray(i) ? "array" : "object";
    case "string":
      return i.length > 100 ? "string" : '"'.concat(i.split('"').join('\\"'), '"');
    default:
      return String(i);
  }
}
function on(i, e, t, n, s) {
  let r = t.localName;
  if (t.repeated) {
    if (F(t.kind != "map"), e === null)
      return;
    if (!Array.isArray(e))
      throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(oe(e)));
    const a = i[r];
    for (const o of e) {
      if (o === null)
        throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(oe(o)));
      switch (t.kind) {
        case "message":
          a.push(t.T.fromJson(o, n));
          break;
        case "enum":
          const c = Xt(t.T, o, n.ignoreUnknownFields, !0);
          c !== Et && a.push(c);
          break;
        case "scalar":
          try {
            a.push(dt(t.T, o, t.L, !0));
          } catch (d) {
            let l = "cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(oe(o));
            throw d instanceof Error && d.message.length > 0 && (l += ": ".concat(d.message)), new Error(l);
          }
          break;
      }
    }
  } else if (t.kind == "map") {
    if (e === null)
      return;
    if (typeof e != "object" || Array.isArray(e))
      throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(oe(e)));
    const a = i[r];
    for (const [o, c] of Object.entries(e)) {
      if (c === null)
        throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: map value null"));
      let d;
      try {
        d = da(t.K, o);
      } catch (l) {
        let u = "cannot decode map key for field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(oe(e));
        throw l instanceof Error && l.message.length > 0 && (u += ": ".concat(l.message)), new Error(u);
      }
      switch (t.V.kind) {
        case "message":
          a[d] = t.V.T.fromJson(c, n);
          break;
        case "enum":
          const l = Xt(t.V.T, c, n.ignoreUnknownFields, !0);
          l !== Et && (a[d] = l);
          break;
        case "scalar":
          try {
            a[d] = dt(t.V.T, c, Se.BIGINT, !0);
          } catch (u) {
            let p = "cannot decode map value for field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(oe(e));
            throw u instanceof Error && u.message.length > 0 && (p += ": ".concat(u.message)), new Error(p);
          }
          break;
      }
    }
  } else
    switch (t.oneof && (i = i[t.oneof.localName] = {
      case: r
    }, r = "value"), t.kind) {
      case "message":
        const a = t.T;
        if (e === null && a.typeName != "google.protobuf.Value")
          return;
        let o = i[r];
        Re(o) ? o.fromJson(e, n) : (i[r] = o = a.fromJson(e, n), a.fieldWrapper && !t.oneof && (i[r] = a.fieldWrapper.unwrapField(o)));
        break;
      case "enum":
        const c = Xt(t.T, e, n.ignoreUnknownFields, !1);
        switch (c) {
          case Bt:
            sn(t, i);
            break;
          case Et:
            break;
          default:
            i[r] = c;
            break;
        }
        break;
      case "scalar":
        try {
          const d = dt(t.T, e, t.L, !1);
          switch (d) {
            case Bt:
              sn(t, i);
              break;
            default:
              i[r] = d;
              break;
          }
        } catch (d) {
          let l = "cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(oe(e));
          throw d instanceof Error && d.message.length > 0 && (l += ": ".concat(d.message)), new Error(l);
        }
        break;
    }
}
function da(i, e) {
  if (i === m.BOOL)
    switch (e) {
      case "true":
        e = !0;
        break;
      case "false":
        e = !1;
        break;
    }
  return dt(i, e, Se.BIGINT, !0).toString();
}
function dt(i, e, t, n) {
  if (e === null)
    return n ? Je(i, t) : Bt;
  switch (i) {
    case m.DOUBLE:
    case m.FLOAT:
      if (e === "NaN")
        return Number.NaN;
      if (e === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (e === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (e === "" || typeof e == "string" && e.trim().length !== e.length || typeof e != "string" && typeof e != "number")
        break;
      const s = Number(e);
      if (Number.isNaN(s) || !Number.isFinite(s))
        break;
      return i == m.FLOAT && zn(s), s;
    case m.INT32:
    case m.FIXED32:
    case m.SFIXED32:
    case m.SINT32:
    case m.UINT32:
      let r;
      if (typeof e == "number" ? r = e : typeof e == "string" && e.length > 0 && e.trim().length === e.length && (r = Number(e)), r === void 0)
        break;
      return i == m.UINT32 || i == m.FIXED32 ? li(r) : Pt(r), r;
    case m.INT64:
    case m.SFIXED64:
    case m.SINT64:
      if (typeof e != "number" && typeof e != "string")
        break;
      const a = j.parse(e);
      return t ? a.toString() : a;
    case m.FIXED64:
    case m.UINT64:
      if (typeof e != "number" && typeof e != "string")
        break;
      const o = j.uParse(e);
      return t ? o.toString() : o;
    case m.BOOL:
      if (typeof e != "boolean")
        break;
      return e;
    case m.STRING:
      if (typeof e != "string")
        break;
      try {
        encodeURIComponent(e);
      } catch {
        throw new Error("invalid UTF8");
      }
      return e;
    case m.BYTES:
      if (e === "")
        return new Uint8Array(0);
      if (typeof e != "string")
        break;
      return is.dec(e);
  }
  throw new Error();
}
function Xt(i, e, t, n) {
  if (e === null)
    return i.typeName == "google.protobuf.NullValue" ? 0 : n ? i.values[0].no : Bt;
  switch (typeof e) {
    case "number":
      if (Number.isInteger(e))
        return e;
      break;
    case "string":
      const s = i.findName(e);
      if (s !== void 0)
        return s.no;
      if (t)
        return Et;
      break;
  }
  throw new Error("cannot decode enum ".concat(i.typeName, " from JSON: ").concat(oe(e)));
}
function la(i) {
  return i.repeated || i.kind == "map" ? !0 : !(i.oneof || i.kind == "message" || i.opt || i.req);
}
function cn(i, e, t) {
  if (i.kind == "map") {
    F(typeof e == "object" && e != null);
    const n = {}, s = Object.entries(e);
    switch (i.V.kind) {
      case "scalar":
        for (const [a, o] of s)
          n[a.toString()] = Rt(i.V.T, o);
        break;
      case "message":
        for (const [a, o] of s)
          n[a.toString()] = o.toJson(t);
        break;
      case "enum":
        const r = i.V.T;
        for (const [a, o] of s)
          n[a.toString()] = Zt(r, o, t.enumAsInteger);
        break;
    }
    return t.emitDefaultValues || s.length > 0 ? n : void 0;
  }
  if (i.repeated) {
    F(Array.isArray(e));
    const n = [];
    switch (i.kind) {
      case "scalar":
        for (let s = 0; s < e.length; s++)
          n.push(Rt(i.T, e[s]));
        break;
      case "enum":
        for (let s = 0; s < e.length; s++)
          n.push(Zt(i.T, e[s], t.enumAsInteger));
        break;
      case "message":
        for (let s = 0; s < e.length; s++)
          n.push(e[s].toJson(t));
        break;
    }
    return t.emitDefaultValues || n.length > 0 ? n : void 0;
  }
  switch (i.kind) {
    case "scalar":
      return Rt(i.T, e);
    case "enum":
      return Zt(i.T, e, t.enumAsInteger);
    case "message":
      return as(i.T, e).toJson(t);
  }
}
function Zt(i, e, t) {
  var n;
  if (F(typeof e == "number"), i.typeName == "google.protobuf.NullValue")
    return null;
  if (t)
    return e;
  const s = i.findNumber(e);
  return (n = s == null ? void 0 : s.name) !== null && n !== void 0 ? n : e;
}
function Rt(i, e) {
  switch (i) {
    case m.INT32:
    case m.SFIXED32:
    case m.SINT32:
    case m.FIXED32:
    case m.UINT32:
      return F(typeof e == "number"), e;
    case m.FLOAT:
    case m.DOUBLE:
      return F(typeof e == "number"), Number.isNaN(e) ? "NaN" : e === Number.POSITIVE_INFINITY ? "Infinity" : e === Number.NEGATIVE_INFINITY ? "-Infinity" : e;
    case m.STRING:
      return F(typeof e == "string"), e;
    case m.BOOL:
      return F(typeof e == "boolean"), e;
    case m.UINT64:
    case m.FIXED64:
    case m.INT64:
    case m.SFIXED64:
    case m.SINT64:
      return F(typeof e == "bigint" || typeof e == "string" || typeof e == "number"), e.toString();
    case m.BYTES:
      return F(e instanceof Uint8Array), is.enc(e);
  }
}
const Ae = Symbol("@bufbuild/protobuf/unknown-fields"), dn = {
  readUnknownFields: !0,
  readerFactory: (i) => new ea(i)
}, ln = {
  writeUnknownFields: !0,
  writerFactory: () => new Zr()
};
function ua(i) {
  return i ? Object.assign(Object.assign({}, dn), i) : dn;
}
function ha(i) {
  return i ? Object.assign(Object.assign({}, ln), i) : ln;
}
function pa() {
  return {
    makeReadOptions: ua,
    makeWriteOptions: ha,
    listUnknownFields(i) {
      var e;
      return (e = i[Ae]) !== null && e !== void 0 ? e : [];
    },
    discardUnknownFields(i) {
      delete i[Ae];
    },
    writeUnknownFields(i, e) {
      const n = i[Ae];
      if (n)
        for (const s of n)
          e.tag(s.no, s.wireType).raw(s.data);
    },
    onUnknownField(i, e, t, n) {
      const s = i;
      Array.isArray(s[Ae]) || (s[Ae] = []), s[Ae].push({
        no: e,
        wireType: t,
        data: n
      });
    },
    readMessage(i, e, t, n, s) {
      const r = i.getType(), a = s ? e.len : e.pos + t;
      let o, c;
      for (; e.pos < a && ([o, c] = e.tag(), c != B.EndGroup); ) {
        const d = r.fields.find(o);
        if (!d) {
          const l = e.skip(c);
          n.readUnknownFields && this.onUnknownField(i, o, c, l);
          continue;
        }
        un(i, e, d, c, n);
      }
      if (s && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      (c != B.EndGroup || o !== t))
        throw new Error("invalid end group tag");
    },
    readField: un,
    writeMessage(i, e, t) {
      const n = i.getType();
      for (const s of n.fields.byNumber()) {
        if (!rs(s, i)) {
          if (s.req)
            throw new Error("cannot encode field ".concat(n.typeName, ".").concat(s.name, " to binary: required field not set"));
          continue;
        }
        const r = s.oneof ? i[s.oneof.localName].value : i[s.localName];
        hn(s, r, e, t);
      }
      return t.writeUnknownFields && this.writeUnknownFields(i, e), e;
    },
    writeField(i, e, t, n) {
      e !== void 0 && hn(i, e, t, n);
    }
  };
}
function un(i, e, t, n, s) {
  let {
    repeated: r,
    localName: a
  } = t;
  switch (t.oneof && (i = i[t.oneof.localName], i.case != a && delete i.value, i.case = a, a = "value"), t.kind) {
    case "scalar":
    case "enum":
      const o = t.kind == "enum" ? m.INT32 : t.T;
      let c = Vt;
      if (t.kind == "scalar" && t.L > 0 && (c = ma), r) {
        let p = i[a];
        if (n == B.LengthDelimited && o != m.STRING && o != m.BYTES) {
          let b = e.uint32() + e.pos;
          for (; e.pos < b; )
            p.push(c(e, o));
        } else
          p.push(c(e, o));
      } else
        i[a] = c(e, o);
      break;
    case "message":
      const d = t.T;
      r ? i[a].push(It(e, new d(), s, t)) : Re(i[a]) ? It(e, i[a], s, t) : (i[a] = It(e, new d(), s, t), d.fieldWrapper && !t.oneof && !t.repeated && (i[a] = d.fieldWrapper.unwrapField(i[a])));
      break;
    case "map":
      let [l, u] = fa(t, e, s);
      i[a][l] = u;
      break;
  }
}
function It(i, e, t, n) {
  const s = e.getType().runtime.bin, r = n == null ? void 0 : n.delimited;
  return s.readMessage(
    e,
    i,
    r ? n.no : i.uint32(),
    // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    t,
    r
  ), e;
}
function fa(i, e, t) {
  const n = e.uint32(), s = e.pos + n;
  let r, a;
  for (; e.pos < s; ) {
    const [o] = e.tag();
    switch (o) {
      case 1:
        r = Vt(e, i.K);
        break;
      case 2:
        switch (i.V.kind) {
          case "scalar":
            a = Vt(e, i.V.T);
            break;
          case "enum":
            a = e.int32();
            break;
          case "message":
            a = It(e, new i.V.T(), t, void 0);
            break;
        }
        break;
    }
  }
  if (r === void 0 && (r = Je(i.K, Se.BIGINT)), typeof r != "string" && typeof r != "number" && (r = r.toString()), a === void 0)
    switch (i.V.kind) {
      case "scalar":
        a = Je(i.V.T, Se.BIGINT);
        break;
      case "enum":
        a = i.V.T.values[0].no;
        break;
      case "message":
        a = new i.V.T();
        break;
    }
  return [r, a];
}
function ma(i, e) {
  const t = Vt(i, e);
  return typeof t == "bigint" ? t.toString() : t;
}
function Vt(i, e) {
  switch (e) {
    case m.STRING:
      return i.string();
    case m.BOOL:
      return i.bool();
    case m.DOUBLE:
      return i.double();
    case m.FLOAT:
      return i.float();
    case m.INT32:
      return i.int32();
    case m.INT64:
      return i.int64();
    case m.UINT64:
      return i.uint64();
    case m.FIXED64:
      return i.fixed64();
    case m.BYTES:
      return i.bytes();
    case m.FIXED32:
      return i.fixed32();
    case m.SFIXED32:
      return i.sfixed32();
    case m.SFIXED64:
      return i.sfixed64();
    case m.SINT64:
      return i.sint64();
    case m.UINT32:
      return i.uint32();
    case m.SINT32:
      return i.sint32();
  }
}
function hn(i, e, t, n) {
  F(e !== void 0);
  const s = i.repeated;
  switch (i.kind) {
    case "scalar":
    case "enum":
      let r = i.kind == "enum" ? m.INT32 : i.T;
      if (s)
        if (F(Array.isArray(e)), i.packed)
          va(t, r, i.no, e);
        else
          for (const a of e)
            lt(t, r, i.no, a);
      else
        lt(t, r, i.no, e);
      break;
    case "message":
      if (s) {
        F(Array.isArray(e));
        for (const a of e)
          pn(t, n, i, a);
      } else
        pn(t, n, i, e);
      break;
    case "map":
      F(typeof e == "object" && e != null);
      for (const [a, o] of Object.entries(e))
        ga(t, n, i, a, o);
      break;
  }
}
function ga(i, e, t, n, s) {
  i.tag(t.no, B.LengthDelimited), i.fork();
  let r = n;
  switch (t.K) {
    case m.INT32:
    case m.FIXED32:
    case m.UINT32:
    case m.SFIXED32:
    case m.SINT32:
      r = Number.parseInt(n);
      break;
    case m.BOOL:
      F(n == "true" || n == "false"), r = n == "true";
      break;
  }
  switch (lt(i, t.K, 1, r), t.V.kind) {
    case "scalar":
      lt(i, t.V.T, 2, s);
      break;
    case "enum":
      lt(i, m.INT32, 2, s);
      break;
    case "message":
      F(s !== void 0), i.tag(2, B.LengthDelimited).bytes(s.toBinary(e));
      break;
  }
  i.join();
}
function pn(i, e, t, n) {
  const s = as(t.T, n);
  t.delimited ? i.tag(t.no, B.StartGroup).raw(s.toBinary(e)).tag(t.no, B.EndGroup) : i.tag(t.no, B.LengthDelimited).bytes(s.toBinary(e));
}
function lt(i, e, t, n) {
  F(n !== void 0);
  let [s, r] = os(e);
  i.tag(t, s)[r](n);
}
function va(i, e, t, n) {
  if (!n.length)
    return;
  i.tag(t, B.LengthDelimited).fork();
  let [, s] = os(e);
  for (let r = 0; r < n.length; r++)
    i[s](n[r]);
  i.join();
}
function os(i) {
  let e = B.Varint;
  switch (i) {
    case m.BYTES:
    case m.STRING:
      e = B.LengthDelimited;
      break;
    case m.DOUBLE:
    case m.FIXED64:
    case m.SFIXED64:
      e = B.Bit64;
      break;
    case m.FIXED32:
    case m.SFIXED32:
    case m.FLOAT:
      e = B.Bit32;
      break;
  }
  const t = m[i].toLowerCase();
  return [e, t];
}
function ba() {
  return {
    setEnumType: Jn,
    initPartial(i, e) {
      if (i === void 0)
        return;
      const t = e.getType();
      for (const n of t.fields.byMember()) {
        const s = n.localName, r = e, a = i;
        if (a[s] !== void 0)
          switch (n.kind) {
            case "oneof":
              const o = a[s].case;
              if (o === void 0)
                continue;
              const c = n.findField(o);
              let d = a[s].value;
              c && c.kind == "message" && !Re(d, c.T) ? d = new c.T(d) : c && c.kind === "scalar" && c.T === m.BYTES && (d = et(d)), r[s] = {
                case: o,
                value: d
              };
              break;
            case "scalar":
            case "enum":
              let l = a[s];
              n.T === m.BYTES && (l = n.repeated ? l.map(et) : et(l)), r[s] = l;
              break;
            case "map":
              switch (n.V.kind) {
                case "scalar":
                case "enum":
                  if (n.V.T === m.BYTES)
                    for (const [f, b] of Object.entries(a[s]))
                      r[s][f] = et(b);
                  else
                    Object.assign(r[s], a[s]);
                  break;
                case "message":
                  const p = n.V.T;
                  for (const f of Object.keys(a[s])) {
                    let b = a[s][f];
                    p.fieldWrapper || (b = new p(b)), r[s][f] = b;
                  }
                  break;
              }
              break;
            case "message":
              const u = n.T;
              if (n.repeated)
                r[s] = a[s].map((p) => Re(p, u) ? p : new u(p));
              else {
                const p = a[s];
                u.fieldWrapper ? /* We can't use BytesValue.typeName as that will create a circular import */ u.typeName === "google.protobuf.BytesValue" ? r[s] = et(p) : r[s] = p : r[s] = Re(p, u) ? p : new u(p);
              }
              break;
          }
      }
    },
    // TODO use isFieldSet() here to support future field presence
    equals(i, e, t) {
      return e === t ? !0 : !e || !t ? !1 : i.fields.byMember().every((n) => {
        const s = e[n.localName], r = t[n.localName];
        if (n.repeated) {
          if (s.length !== r.length)
            return !1;
          switch (n.kind) {
            case "message":
              return s.every((a, o) => n.T.equals(a, r[o]));
            case "scalar":
              return s.every((a, o) => ye(n.T, a, r[o]));
            case "enum":
              return s.every((a, o) => ye(m.INT32, a, r[o]));
          }
          throw new Error("repeated cannot contain ".concat(n.kind));
        }
        switch (n.kind) {
          case "message":
            return n.T.equals(s, r);
          case "enum":
            return ye(m.INT32, s, r);
          case "scalar":
            return ye(n.T, s, r);
          case "oneof":
            if (s.case !== r.case)
              return !1;
            const a = n.findField(s.case);
            if (a === void 0)
              return !0;
            switch (a.kind) {
              case "message":
                return a.T.equals(s.value, r.value);
              case "enum":
                return ye(m.INT32, s.value, r.value);
              case "scalar":
                return ye(a.T, s.value, r.value);
            }
            throw new Error("oneof cannot contain ".concat(a.kind));
          case "map":
            const o = Object.keys(s).concat(Object.keys(r));
            switch (n.V.kind) {
              case "message":
                const c = n.V.T;
                return o.every((l) => c.equals(s[l], r[l]));
              case "enum":
                return o.every((l) => ye(m.INT32, s[l], r[l]));
              case "scalar":
                const d = n.V.T;
                return o.every((l) => ye(d, s[l], r[l]));
            }
            break;
        }
      });
    },
    // TODO use isFieldSet() here to support future field presence
    clone(i) {
      const e = i.getType(), t = new e(), n = t;
      for (const s of e.fields.byMember()) {
        const r = i[s.localName];
        let a;
        if (s.repeated)
          a = r.map(St);
        else if (s.kind == "map") {
          a = n[s.localName];
          for (const [o, c] of Object.entries(r))
            a[o] = St(c);
        } else
          s.kind == "oneof" ? a = s.findField(r.case) ? {
            case: r.case,
            value: St(r.value)
          } : {
            case: void 0
          } : a = St(r);
        n[s.localName] = a;
      }
      for (const s of e.runtime.bin.listUnknownFields(i))
        e.runtime.bin.onUnknownField(n, s.no, s.wireType, s.data);
      return t;
    }
  };
}
function St(i) {
  if (i === void 0)
    return i;
  if (Re(i))
    return i.clone();
  if (i instanceof Uint8Array) {
    const e = new Uint8Array(i.byteLength);
    return e.set(i), e;
  }
  return i;
}
function et(i) {
  return i instanceof Uint8Array ? i : new Uint8Array(i);
}
function ka(i, e, t) {
  return {
    syntax: i,
    json: ca(),
    bin: pa(),
    util: Object.assign(Object.assign({}, ba()), {
      newFieldList: e,
      initFields: t
    }),
    makeMessageType(n, s, r) {
      return Wr(this, n, s, r);
    },
    makeEnum: zr,
    makeEnumType: Qn,
    getEnumType: Hr,
    makeExtension(n, s, r) {
      return ta(this, n, s, r);
    }
  };
}
class ya {
  constructor(e, t) {
    this._fields = e, this._normalizer = t;
  }
  findJsonName(e) {
    if (!this.jsonNames) {
      const t = {};
      for (const n of this.list())
        t[n.jsonName] = t[n.name] = n;
      this.jsonNames = t;
    }
    return this.jsonNames[e];
  }
  find(e) {
    if (!this.numbers) {
      const t = {};
      for (const n of this.list())
        t[n.no] = n;
      this.numbers = t;
    }
    return this.numbers[e];
  }
  list() {
    return this.all || (this.all = this._normalizer(this._fields)), this.all;
  }
  byNumber() {
    return this.numbersAsc || (this.numbersAsc = this.list().concat().sort((e, t) => e.no - t.no)), this.numbersAsc;
  }
  byMember() {
    if (!this.members) {
      this.members = [];
      const e = this.members;
      let t;
      for (const n of this.list())
        n.oneof ? n.oneof !== t && (t = n.oneof, e.push(t)) : e.push(n);
    }
    return this.members;
  }
}
function cs(i, e) {
  const t = ds(i);
  return e ? t : Ea(wa(t));
}
function Ta(i) {
  return cs(i, !1);
}
const Sa = ds;
function ds(i) {
  let e = !1;
  const t = [];
  for (let n = 0; n < i.length; n++) {
    let s = i.charAt(n);
    switch (s) {
      case "_":
        e = !0;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        t.push(s), e = !1;
        break;
      default:
        e && (e = !1, s = s.toUpperCase()), t.push(s);
        break;
    }
  }
  return t.join("");
}
const Ca = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]), Pa = /* @__PURE__ */ new Set([
  // names reserved by the runtime
  "getType",
  "clone",
  "equals",
  "fromBinary",
  "fromJson",
  "fromJsonString",
  "toBinary",
  "toJson",
  "toJsonString",
  // names reserved by the runtime for the future
  "toObject"
]), ls = (i) => "".concat(i, "$"), wa = (i) => Pa.has(i) ? ls(i) : i, Ea = (i) => Ca.has(i) ? ls(i) : i;
class Ra {
  constructor(e) {
    this.kind = "oneof", this.repeated = !1, this.packed = !1, this.opt = !1, this.req = !1, this.default = void 0, this.fields = [], this.name = e, this.localName = Ta(e);
  }
  addField(e) {
    F(e.oneof === this, "field ".concat(e.name, " not one of ").concat(this.name)), this.fields.push(e);
  }
  findField(e) {
    if (!this._lookup) {
      this._lookup = /* @__PURE__ */ Object.create(null);
      for (let t = 0; t < this.fields.length; t++)
        this._lookup[this.fields[t].localName] = this.fields[t];
    }
    return this._lookup[e];
  }
}
function Ia(i, e) {
  var t, n, s, r, a, o;
  const c = [];
  let d;
  for (const l of typeof i == "function" ? i() : i) {
    const u = l;
    if (u.localName = cs(l.name, l.oneof !== void 0), u.jsonName = (t = l.jsonName) !== null && t !== void 0 ? t : Sa(l.name), u.repeated = (n = l.repeated) !== null && n !== void 0 ? n : !1, l.kind == "scalar" && (u.L = (s = l.L) !== null && s !== void 0 ? s : Se.BIGINT), u.delimited = (r = l.delimited) !== null && r !== void 0 ? r : !1, u.req = (a = l.req) !== null && a !== void 0 ? a : !1, u.opt = (o = l.opt) !== null && o !== void 0 ? o : !1, l.packed === void 0 && (e ? u.packed = l.kind == "enum" || l.kind == "scalar" && l.T != m.BYTES && l.T != m.STRING : u.packed = !1), l.oneof !== void 0) {
      const p = typeof l.oneof == "string" ? l.oneof : l.oneof.name;
      (!d || d.name != p) && (d = new Ra(p)), u.oneof = d, d.addField(u);
    }
    c.push(u);
  }
  return c;
}
const g = ka(
  "proto3",
  (i) => new ya(i, (e) => Ia(e, !0)),
  // TODO merge with proto2 and initExtensionField, also see initPartial, equals, clone
  (i) => {
    for (const e of i.getType().fields.byMember()) {
      if (e.opt)
        continue;
      const t = e.localName, n = i;
      if (e.repeated) {
        n[t] = [];
        continue;
      }
      switch (e.kind) {
        case "oneof":
          n[t] = {
            case: void 0
          };
          break;
        case "enum":
          n[t] = 0;
          break;
        case "map":
          n[t] = {};
          break;
        case "scalar":
          n[t] = Je(e.T, e.L);
          break;
      }
    }
  }
), re = /* @__PURE__ */ g.makeEnum("livekit.TrackType", [{
  no: 0,
  name: "AUDIO"
}, {
  no: 1,
  name: "VIDEO"
}, {
  no: 2,
  name: "DATA"
}]), H = /* @__PURE__ */ g.makeEnum("livekit.TrackSource", [{
  no: 0,
  name: "UNKNOWN"
}, {
  no: 1,
  name: "CAMERA"
}, {
  no: 2,
  name: "MICROPHONE"
}, {
  no: 3,
  name: "SCREEN_SHARE"
}, {
  no: 4,
  name: "SCREEN_SHARE_AUDIO"
}]), Ke = /* @__PURE__ */ g.makeEnum("livekit.VideoQuality", [{
  no: 0,
  name: "LOW"
}, {
  no: 1,
  name: "MEDIUM"
}, {
  no: 2,
  name: "HIGH"
}, {
  no: 3,
  name: "OFF"
}]), rt = /* @__PURE__ */ g.makeEnum("livekit.ConnectionQuality", [{
  no: 0,
  name: "POOR"
}, {
  no: 1,
  name: "GOOD"
}, {
  no: 2,
  name: "EXCELLENT"
}, {
  no: 3,
  name: "LOST"
}]), ft = /* @__PURE__ */ g.makeEnum("livekit.ClientConfigSetting", [{
  no: 0,
  name: "UNSET"
}, {
  no: 1,
  name: "DISABLED"
}, {
  no: 2,
  name: "ENABLED"
}]), ut = /* @__PURE__ */ g.makeEnum("livekit.DisconnectReason", [{
  no: 0,
  name: "UNKNOWN_REASON"
}, {
  no: 1,
  name: "CLIENT_INITIATED"
}, {
  no: 2,
  name: "DUPLICATE_IDENTITY"
}, {
  no: 3,
  name: "SERVER_SHUTDOWN"
}, {
  no: 4,
  name: "PARTICIPANT_REMOVED"
}, {
  no: 5,
  name: "ROOM_DELETED"
}, {
  no: 6,
  name: "STATE_MISMATCH"
}, {
  no: 7,
  name: "JOIN_FAILURE"
}, {
  no: 8,
  name: "MIGRATION"
}, {
  no: 9,
  name: "SIGNAL_CLOSE"
}]), Ne = /* @__PURE__ */ g.makeEnum("livekit.ReconnectReason", [{
  no: 0,
  name: "RR_UNKNOWN"
}, {
  no: 1,
  name: "RR_SIGNAL_DISCONNECTED"
}, {
  no: 2,
  name: "RR_PUBLISHER_FAILED"
}, {
  no: 3,
  name: "RR_SUBSCRIBER_FAILED"
}, {
  no: 4,
  name: "RR_SWITCH_CANDIDATE"
}]), xa = /* @__PURE__ */ g.makeEnum("livekit.SubscriptionError", [{
  no: 0,
  name: "SE_UNKNOWN"
}, {
  no: 1,
  name: "SE_CODEC_UNSUPPORTED"
}, {
  no: 2,
  name: "SE_TRACK_NOTFOUND"
}]), ue = /* @__PURE__ */ g.makeEnum("livekit.AudioTrackFeature", [{
  no: 0,
  name: "TF_STEREO"
}, {
  no: 1,
  name: "TF_NO_DTX"
}, {
  no: 2,
  name: "TF_AUTO_GAIN_CONTROL"
}, {
  no: 3,
  name: "TF_ECHO_CANCELLATION"
}, {
  no: 4,
  name: "TF_NOISE_SUPPRESSION"
}, {
  no: 5,
  name: "TF_ENHANCED_NOISE_CANCELLATION"
}]), Oi = /* @__PURE__ */ g.makeMessageType("livekit.Room", () => [{
  no: 1,
  name: "sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "name",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "empty_timeout",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 14,
  name: "departure_timeout",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 4,
  name: "max_participants",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 5,
  name: "creation_time",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}, {
  no: 6,
  name: "turn_password",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 7,
  name: "enabled_codecs",
  kind: "message",
  T: ui,
  repeated: !0
}, {
  no: 8,
  name: "metadata",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 9,
  name: "num_participants",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 11,
  name: "num_publishers",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 10,
  name: "active_recording",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 13,
  name: "version",
  kind: "message",
  T: vs
}]), ui = /* @__PURE__ */ g.makeMessageType("livekit.Codec", () => [{
  no: 1,
  name: "mime",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "fmtp_line",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), Ma = /* @__PURE__ */ g.makeMessageType("livekit.ParticipantPermission", () => [{
  no: 1,
  name: "can_subscribe",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 2,
  name: "can_publish",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 3,
  name: "can_publish_data",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 9,
  name: "can_publish_sources",
  kind: "enum",
  T: g.getEnumType(H),
  repeated: !0
}, {
  no: 7,
  name: "hidden",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 8,
  name: "recorder",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 10,
  name: "can_update_metadata",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 11,
  name: "agent",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}]), mt = /* @__PURE__ */ g.makeMessageType("livekit.ParticipantInfo", () => [{
  no: 1,
  name: "sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "identity",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "state",
  kind: "enum",
  T: g.getEnumType(hi)
}, {
  no: 4,
  name: "tracks",
  kind: "message",
  T: Be,
  repeated: !0
}, {
  no: 5,
  name: "metadata",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 6,
  name: "joined_at",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}, {
  no: 9,
  name: "name",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 10,
  name: "version",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 11,
  name: "permission",
  kind: "message",
  T: Ma
}, {
  no: 12,
  name: "region",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 13,
  name: "is_publisher",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 14,
  name: "kind",
  kind: "enum",
  T: g.getEnumType(Da)
}]), hi = /* @__PURE__ */ g.makeEnum("livekit.ParticipantInfo.State", [{
  no: 0,
  name: "JOINING"
}, {
  no: 1,
  name: "JOINED"
}, {
  no: 2,
  name: "ACTIVE"
}, {
  no: 3,
  name: "DISCONNECTED"
}]), Da = /* @__PURE__ */ g.makeEnum("livekit.ParticipantInfo.Kind", [{
  no: 0,
  name: "STANDARD"
}, {
  no: 1,
  name: "INGRESS"
}, {
  no: 2,
  name: "EGRESS"
}, {
  no: 3,
  name: "SIP"
}, {
  no: 4,
  name: "AGENT"
}]), te = /* @__PURE__ */ g.makeEnum("livekit.Encryption.Type", [{
  no: 0,
  name: "NONE"
}, {
  no: 1,
  name: "GCM"
}, {
  no: 2,
  name: "CUSTOM"
}]), _a = /* @__PURE__ */ g.makeMessageType("livekit.SimulcastCodecInfo", () => [{
  no: 1,
  name: "mime_type",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "mid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "cid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 4,
  name: "layers",
  kind: "message",
  T: Ie,
  repeated: !0
}]), Be = /* @__PURE__ */ g.makeMessageType("livekit.TrackInfo", () => [{
  no: 1,
  name: "sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "type",
  kind: "enum",
  T: g.getEnumType(re)
}, {
  no: 3,
  name: "name",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 4,
  name: "muted",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 5,
  name: "width",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 6,
  name: "height",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 7,
  name: "simulcast",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 8,
  name: "disable_dtx",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 9,
  name: "source",
  kind: "enum",
  T: g.getEnumType(H)
}, {
  no: 10,
  name: "layers",
  kind: "message",
  T: Ie,
  repeated: !0
}, {
  no: 11,
  name: "mime_type",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 12,
  name: "mid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 13,
  name: "codecs",
  kind: "message",
  T: _a,
  repeated: !0
}, {
  no: 14,
  name: "stereo",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 15,
  name: "disable_red",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 16,
  name: "encryption",
  kind: "enum",
  T: g.getEnumType(te)
}, {
  no: 17,
  name: "stream",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 18,
  name: "version",
  kind: "message",
  T: vs
}]), Ie = /* @__PURE__ */ g.makeMessageType("livekit.VideoLayer", () => [{
  no: 1,
  name: "quality",
  kind: "enum",
  T: g.getEnumType(Ke)
}, {
  no: 2,
  name: "width",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 3,
  name: "height",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 4,
  name: "bitrate",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 5,
  name: "ssrc",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}]), us = /* @__PURE__ */ g.makeMessageType("livekit.DataPacket", () => [{
  no: 1,
  name: "kind",
  kind: "enum",
  T: g.getEnumType(z)
}, {
  no: 4,
  name: "participant_identity",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 5,
  name: "destination_identities",
  kind: "scalar",
  T: 9,
  repeated: !0
}, {
  no: 2,
  name: "user",
  kind: "message",
  T: ps,
  oneof: "value"
}, {
  no: 3,
  name: "speaker",
  kind: "message",
  T: La,
  oneof: "value"
}, {
  no: 6,
  name: "sip_dtmf",
  kind: "message",
  T: Aa,
  oneof: "value"
}]), z = /* @__PURE__ */ g.makeEnum("livekit.DataPacket.Kind", [{
  no: 0,
  name: "RELIABLE"
}, {
  no: 1,
  name: "LOSSY"
}]), La = /* @__PURE__ */ g.makeMessageType("livekit.ActiveSpeakerUpdate", () => [{
  no: 1,
  name: "speakers",
  kind: "message",
  T: hs,
  repeated: !0
}]), hs = /* @__PURE__ */ g.makeMessageType("livekit.SpeakerInfo", () => [{
  no: 1,
  name: "sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "level",
  kind: "scalar",
  T: 2
  /* ScalarType.FLOAT */
}, {
  no: 3,
  name: "active",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}]), ps = /* @__PURE__ */ g.makeMessageType("livekit.UserPacket", () => [{
  no: 1,
  name: "participant_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 5,
  name: "participant_identity",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "payload",
  kind: "scalar",
  T: 12
  /* ScalarType.BYTES */
}, {
  no: 3,
  name: "destination_sids",
  kind: "scalar",
  T: 9,
  repeated: !0
}, {
  no: 6,
  name: "destination_identities",
  kind: "scalar",
  T: 9,
  repeated: !0
}, {
  no: 4,
  name: "topic",
  kind: "scalar",
  T: 9,
  opt: !0
}]), Aa = /* @__PURE__ */ g.makeMessageType("livekit.SipDTMF", () => [{
  no: 3,
  name: "code",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 4,
  name: "digit",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), fs = /* @__PURE__ */ g.makeMessageType("livekit.ParticipantTracks", () => [{
  no: 1,
  name: "participant_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "track_sids",
  kind: "scalar",
  T: 9,
  repeated: !0
}]), Na = /* @__PURE__ */ g.makeMessageType("livekit.ServerInfo", () => [{
  no: 1,
  name: "edition",
  kind: "enum",
  T: g.getEnumType(Oa)
}, {
  no: 2,
  name: "version",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "protocol",
  kind: "scalar",
  T: 5
  /* ScalarType.INT32 */
}, {
  no: 4,
  name: "region",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 5,
  name: "node_id",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 6,
  name: "debug_info",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 7,
  name: "agent_protocol",
  kind: "scalar",
  T: 5
  /* ScalarType.INT32 */
}]), Oa = /* @__PURE__ */ g.makeEnum("livekit.ServerInfo.Edition", [{
  no: 0,
  name: "Standard"
}, {
  no: 1,
  name: "Cloud"
}]), Ua = /* @__PURE__ */ g.makeMessageType("livekit.ClientInfo", () => [{
  no: 1,
  name: "sdk",
  kind: "enum",
  T: g.getEnumType(ms)
}, {
  no: 2,
  name: "version",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "protocol",
  kind: "scalar",
  T: 5
  /* ScalarType.INT32 */
}, {
  no: 4,
  name: "os",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 5,
  name: "os_version",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 6,
  name: "device_model",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 7,
  name: "browser",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 8,
  name: "browser_version",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 9,
  name: "address",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 10,
  name: "network",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), ms = /* @__PURE__ */ g.makeEnum("livekit.ClientInfo.SDK", [{
  no: 0,
  name: "UNKNOWN"
}, {
  no: 1,
  name: "JS"
}, {
  no: 2,
  name: "SWIFT"
}, {
  no: 3,
  name: "ANDROID"
}, {
  no: 4,
  name: "FLUTTER"
}, {
  no: 5,
  name: "GO"
}, {
  no: 6,
  name: "UNITY"
}, {
  no: 7,
  name: "REACT_NATIVE"
}, {
  no: 8,
  name: "RUST"
}, {
  no: 9,
  name: "PYTHON"
}, {
  no: 10,
  name: "CPP"
}]), gs = /* @__PURE__ */ g.makeMessageType("livekit.ClientConfiguration", () => [{
  no: 1,
  name: "video",
  kind: "message",
  T: fn
}, {
  no: 2,
  name: "screen",
  kind: "message",
  T: fn
}, {
  no: 3,
  name: "resume_connection",
  kind: "enum",
  T: g.getEnumType(ft)
}, {
  no: 4,
  name: "disabled_codecs",
  kind: "message",
  T: Fa
}, {
  no: 5,
  name: "force_relay",
  kind: "enum",
  T: g.getEnumType(ft)
}]), fn = /* @__PURE__ */ g.makeMessageType("livekit.VideoConfiguration", () => [{
  no: 1,
  name: "hardware_encoder",
  kind: "enum",
  T: g.getEnumType(ft)
}]), Fa = /* @__PURE__ */ g.makeMessageType("livekit.DisabledCodecs", () => [{
  no: 1,
  name: "codecs",
  kind: "message",
  T: ui,
  repeated: !0
}, {
  no: 2,
  name: "publish",
  kind: "message",
  T: ui,
  repeated: !0
}]), vs = /* @__PURE__ */ g.makeMessageType("livekit.TimedVersion", () => [{
  no: 1,
  name: "unix_micro",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}, {
  no: 2,
  name: "ticks",
  kind: "scalar",
  T: 5
  /* ScalarType.INT32 */
}]), ae = /* @__PURE__ */ g.makeEnum("livekit.SignalTarget", [{
  no: 0,
  name: "PUBLISHER"
}, {
  no: 1,
  name: "SUBSCRIBER"
}]), pi = /* @__PURE__ */ g.makeEnum("livekit.StreamState", [{
  no: 0,
  name: "ACTIVE"
}, {
  no: 1,
  name: "PAUSED"
}]), Ba = /* @__PURE__ */ g.makeEnum("livekit.CandidateProtocol", [{
  no: 0,
  name: "UDP"
}, {
  no: 1,
  name: "TCP"
}, {
  no: 2,
  name: "TLS"
}]), Va = /* @__PURE__ */ g.makeMessageType("livekit.SignalRequest", () => [{
  no: 1,
  name: "offer",
  kind: "message",
  T: Me,
  oneof: "message"
}, {
  no: 2,
  name: "answer",
  kind: "message",
  T: Me,
  oneof: "message"
}, {
  no: 3,
  name: "trickle",
  kind: "message",
  T: Ui,
  oneof: "message"
}, {
  no: 4,
  name: "add_track",
  kind: "message",
  T: mi,
  oneof: "message"
}, {
  no: 5,
  name: "mute",
  kind: "message",
  T: Fi,
  oneof: "message"
}, {
  no: 6,
  name: "subscription",
  kind: "message",
  T: Ht,
  oneof: "message"
}, {
  no: 7,
  name: "track_setting",
  kind: "message",
  T: bs,
  oneof: "message"
}, {
  no: 8,
  name: "leave",
  kind: "message",
  T: zt,
  oneof: "message"
}, {
  no: 10,
  name: "update_layers",
  kind: "message",
  T: ys,
  oneof: "message"
}, {
  no: 11,
  name: "subscription_permission",
  kind: "message",
  T: Ps,
  oneof: "message"
}, {
  no: 12,
  name: "sync_state",
  kind: "message",
  T: ws,
  oneof: "message"
}, {
  no: 13,
  name: "simulate",
  kind: "message",
  T: le,
  oneof: "message"
}, {
  no: 14,
  name: "ping",
  kind: "scalar",
  T: 3,
  oneof: "message"
}, {
  no: 15,
  name: "update_metadata",
  kind: "message",
  T: Ts,
  oneof: "message"
}, {
  no: 16,
  name: "ping_req",
  kind: "message",
  T: Rs,
  oneof: "message"
}, {
  no: 17,
  name: "update_audio_track",
  kind: "message",
  T: ks,
  oneof: "message"
}, {
  no: 18,
  name: "update_video_track",
  kind: "message",
  T: Ha,
  oneof: "message"
}]), mn = /* @__PURE__ */ g.makeMessageType("livekit.SignalResponse", () => [{
  no: 1,
  name: "join",
  kind: "message",
  T: qa,
  oneof: "message"
}, {
  no: 2,
  name: "answer",
  kind: "message",
  T: Me,
  oneof: "message"
}, {
  no: 3,
  name: "offer",
  kind: "message",
  T: Me,
  oneof: "message"
}, {
  no: 4,
  name: "trickle",
  kind: "message",
  T: Ui,
  oneof: "message"
}, {
  no: 5,
  name: "update",
  kind: "message",
  T: Ga,
  oneof: "message"
}, {
  no: 6,
  name: "track_published",
  kind: "message",
  T: Bi,
  oneof: "message"
}, {
  no: 8,
  name: "leave",
  kind: "message",
  T: zt,
  oneof: "message"
}, {
  no: 9,
  name: "mute",
  kind: "message",
  T: Fi,
  oneof: "message"
}, {
  no: 10,
  name: "speakers_changed",
  kind: "message",
  T: Wa,
  oneof: "message"
}, {
  no: 11,
  name: "room_update",
  kind: "message",
  T: Ja,
  oneof: "message"
}, {
  no: 12,
  name: "connection_quality",
  kind: "message",
  T: $a,
  oneof: "message"
}, {
  no: 13,
  name: "stream_state_update",
  kind: "message",
  T: Xa,
  oneof: "message"
}, {
  no: 14,
  name: "subscribed_quality_update",
  kind: "message",
  T: eo,
  oneof: "message"
}, {
  no: 15,
  name: "subscription_permission_update",
  kind: "message",
  T: to,
  oneof: "message"
}, {
  no: 16,
  name: "refresh_token",
  kind: "scalar",
  T: 9,
  oneof: "message"
}, {
  no: 17,
  name: "track_unpublished",
  kind: "message",
  T: ja,
  oneof: "message"
}, {
  no: 18,
  name: "pong",
  kind: "scalar",
  T: 3,
  oneof: "message"
}, {
  no: 19,
  name: "reconnect",
  kind: "message",
  T: Ka,
  oneof: "message"
}, {
  no: 20,
  name: "pong_resp",
  kind: "message",
  T: io,
  oneof: "message"
}, {
  no: 21,
  name: "subscription_response",
  kind: "message",
  T: ro,
  oneof: "message"
}]), fi = /* @__PURE__ */ g.makeMessageType("livekit.SimulcastCodec", () => [{
  no: 1,
  name: "codec",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "cid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), mi = /* @__PURE__ */ g.makeMessageType("livekit.AddTrackRequest", () => [{
  no: 1,
  name: "cid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "name",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "type",
  kind: "enum",
  T: g.getEnumType(re)
}, {
  no: 4,
  name: "width",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 5,
  name: "height",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 6,
  name: "muted",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 7,
  name: "disable_dtx",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 8,
  name: "source",
  kind: "enum",
  T: g.getEnumType(H)
}, {
  no: 9,
  name: "layers",
  kind: "message",
  T: Ie,
  repeated: !0
}, {
  no: 10,
  name: "simulcast_codecs",
  kind: "message",
  T: fi,
  repeated: !0
}, {
  no: 11,
  name: "sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 12,
  name: "stereo",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 13,
  name: "disable_red",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 14,
  name: "encryption",
  kind: "enum",
  T: g.getEnumType(te)
}, {
  no: 15,
  name: "stream",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), Ui = /* @__PURE__ */ g.makeMessageType("livekit.TrickleRequest", () => [{
  no: 1,
  name: "candidateInit",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "target",
  kind: "enum",
  T: g.getEnumType(ae)
}]), Fi = /* @__PURE__ */ g.makeMessageType("livekit.MuteTrackRequest", () => [{
  no: 1,
  name: "sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "muted",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}]), qa = /* @__PURE__ */ g.makeMessageType("livekit.JoinResponse", () => [{
  no: 1,
  name: "room",
  kind: "message",
  T: Oi
}, {
  no: 2,
  name: "participant",
  kind: "message",
  T: mt
}, {
  no: 3,
  name: "other_participants",
  kind: "message",
  T: mt,
  repeated: !0
}, {
  no: 4,
  name: "server_version",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 5,
  name: "ice_servers",
  kind: "message",
  T: Ss,
  repeated: !0
}, {
  no: 6,
  name: "subscriber_primary",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 7,
  name: "alternative_url",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 8,
  name: "client_configuration",
  kind: "message",
  T: gs
}, {
  no: 9,
  name: "server_region",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 10,
  name: "ping_timeout",
  kind: "scalar",
  T: 5
  /* ScalarType.INT32 */
}, {
  no: 11,
  name: "ping_interval",
  kind: "scalar",
  T: 5
  /* ScalarType.INT32 */
}, {
  no: 12,
  name: "server_info",
  kind: "message",
  T: Na
}, {
  no: 13,
  name: "sif_trailer",
  kind: "scalar",
  T: 12
  /* ScalarType.BYTES */
}]), Ka = /* @__PURE__ */ g.makeMessageType("livekit.ReconnectResponse", () => [{
  no: 1,
  name: "ice_servers",
  kind: "message",
  T: Ss,
  repeated: !0
}, {
  no: 2,
  name: "client_configuration",
  kind: "message",
  T: gs
}]), Bi = /* @__PURE__ */ g.makeMessageType("livekit.TrackPublishedResponse", () => [{
  no: 1,
  name: "cid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "track",
  kind: "message",
  T: Be
}]), ja = /* @__PURE__ */ g.makeMessageType("livekit.TrackUnpublishedResponse", () => [{
  no: 1,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), Me = /* @__PURE__ */ g.makeMessageType("livekit.SessionDescription", () => [{
  no: 1,
  name: "type",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "sdp",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), Ga = /* @__PURE__ */ g.makeMessageType("livekit.ParticipantUpdate", () => [{
  no: 1,
  name: "participants",
  kind: "message",
  T: mt,
  repeated: !0
}]), Ht = /* @__PURE__ */ g.makeMessageType("livekit.UpdateSubscription", () => [{
  no: 1,
  name: "track_sids",
  kind: "scalar",
  T: 9,
  repeated: !0
}, {
  no: 2,
  name: "subscribe",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 3,
  name: "participant_tracks",
  kind: "message",
  T: fs,
  repeated: !0
}]), bs = /* @__PURE__ */ g.makeMessageType("livekit.UpdateTrackSettings", () => [{
  no: 1,
  name: "track_sids",
  kind: "scalar",
  T: 9,
  repeated: !0
}, {
  no: 3,
  name: "disabled",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 4,
  name: "quality",
  kind: "enum",
  T: g.getEnumType(Ke)
}, {
  no: 5,
  name: "width",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 6,
  name: "height",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 7,
  name: "fps",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 8,
  name: "priority",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}]), ks = /* @__PURE__ */ g.makeMessageType("livekit.UpdateLocalAudioTrack", () => [{
  no: 1,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "features",
  kind: "enum",
  T: g.getEnumType(ue),
  repeated: !0
}]), Ha = /* @__PURE__ */ g.makeMessageType("livekit.UpdateLocalVideoTrack", () => [{
  no: 1,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "width",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 3,
  name: "height",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}]), zt = /* @__PURE__ */ g.makeMessageType("livekit.LeaveRequest", () => [{
  no: 1,
  name: "can_reconnect",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 2,
  name: "reason",
  kind: "enum",
  T: g.getEnumType(ut)
}, {
  no: 3,
  name: "action",
  kind: "enum",
  T: g.getEnumType(za)
}, {
  no: 4,
  name: "regions",
  kind: "message",
  T: no
}]), za = /* @__PURE__ */ g.makeEnum("livekit.LeaveRequest.Action", [{
  no: 0,
  name: "DISCONNECT"
}, {
  no: 1,
  name: "RESUME"
}, {
  no: 2,
  name: "RECONNECT"
}]), ys = /* @__PURE__ */ g.makeMessageType("livekit.UpdateVideoLayers", () => [{
  no: 1,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "layers",
  kind: "message",
  T: Ie,
  repeated: !0
}]), Ts = /* @__PURE__ */ g.makeMessageType("livekit.UpdateParticipantMetadata", () => [{
  no: 1,
  name: "metadata",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "name",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), Ss = /* @__PURE__ */ g.makeMessageType("livekit.ICEServer", () => [{
  no: 1,
  name: "urls",
  kind: "scalar",
  T: 9,
  repeated: !0
}, {
  no: 2,
  name: "username",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "credential",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), Wa = /* @__PURE__ */ g.makeMessageType("livekit.SpeakersChanged", () => [{
  no: 1,
  name: "speakers",
  kind: "message",
  T: hs,
  repeated: !0
}]), Ja = /* @__PURE__ */ g.makeMessageType("livekit.RoomUpdate", () => [{
  no: 1,
  name: "room",
  kind: "message",
  T: Oi
}]), Qa = /* @__PURE__ */ g.makeMessageType("livekit.ConnectionQualityInfo", () => [{
  no: 1,
  name: "participant_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "quality",
  kind: "enum",
  T: g.getEnumType(rt)
}, {
  no: 3,
  name: "score",
  kind: "scalar",
  T: 2
  /* ScalarType.FLOAT */
}]), $a = /* @__PURE__ */ g.makeMessageType("livekit.ConnectionQualityUpdate", () => [{
  no: 1,
  name: "updates",
  kind: "message",
  T: Qa,
  repeated: !0
}]), Ya = /* @__PURE__ */ g.makeMessageType("livekit.StreamStateInfo", () => [{
  no: 1,
  name: "participant_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "state",
  kind: "enum",
  T: g.getEnumType(pi)
}]), Xa = /* @__PURE__ */ g.makeMessageType("livekit.StreamStateUpdate", () => [{
  no: 1,
  name: "stream_states",
  kind: "message",
  T: Ya,
  repeated: !0
}]), Vi = /* @__PURE__ */ g.makeMessageType("livekit.SubscribedQuality", () => [{
  no: 1,
  name: "quality",
  kind: "enum",
  T: g.getEnumType(Ke)
}, {
  no: 2,
  name: "enabled",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}]), Za = /* @__PURE__ */ g.makeMessageType("livekit.SubscribedCodec", () => [{
  no: 1,
  name: "codec",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "qualities",
  kind: "message",
  T: Vi,
  repeated: !0
}]), eo = /* @__PURE__ */ g.makeMessageType("livekit.SubscribedQualityUpdate", () => [{
  no: 1,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "subscribed_qualities",
  kind: "message",
  T: Vi,
  repeated: !0
}, {
  no: 3,
  name: "subscribed_codecs",
  kind: "message",
  T: Za,
  repeated: !0
}]), Cs = /* @__PURE__ */ g.makeMessageType("livekit.TrackPermission", () => [{
  no: 1,
  name: "participant_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "all_tracks",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 3,
  name: "track_sids",
  kind: "scalar",
  T: 9,
  repeated: !0
}, {
  no: 4,
  name: "participant_identity",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}]), Ps = /* @__PURE__ */ g.makeMessageType("livekit.SubscriptionPermission", () => [{
  no: 1,
  name: "all_participants",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}, {
  no: 2,
  name: "track_permissions",
  kind: "message",
  T: Cs,
  repeated: !0
}]), to = /* @__PURE__ */ g.makeMessageType("livekit.SubscriptionPermissionUpdate", () => [{
  no: 1,
  name: "participant_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "allowed",
  kind: "scalar",
  T: 8
  /* ScalarType.BOOL */
}]), ws = /* @__PURE__ */ g.makeMessageType("livekit.SyncState", () => [{
  no: 1,
  name: "answer",
  kind: "message",
  T: Me
}, {
  no: 2,
  name: "subscription",
  kind: "message",
  T: Ht
}, {
  no: 3,
  name: "publish_tracks",
  kind: "message",
  T: Bi,
  repeated: !0
}, {
  no: 4,
  name: "data_channels",
  kind: "message",
  T: Es,
  repeated: !0
}, {
  no: 5,
  name: "offer",
  kind: "message",
  T: Me
}, {
  no: 6,
  name: "track_sids_disabled",
  kind: "scalar",
  T: 9,
  repeated: !0
}]), Es = /* @__PURE__ */ g.makeMessageType("livekit.DataChannelInfo", () => [{
  no: 1,
  name: "label",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "id",
  kind: "scalar",
  T: 13
  /* ScalarType.UINT32 */
}, {
  no: 3,
  name: "target",
  kind: "enum",
  T: g.getEnumType(ae)
}]), le = /* @__PURE__ */ g.makeMessageType("livekit.SimulateScenario", () => [{
  no: 1,
  name: "speaker_update",
  kind: "scalar",
  T: 5,
  oneof: "scenario"
}, {
  no: 2,
  name: "node_failure",
  kind: "scalar",
  T: 8,
  oneof: "scenario"
}, {
  no: 3,
  name: "migration",
  kind: "scalar",
  T: 8,
  oneof: "scenario"
}, {
  no: 4,
  name: "server_leave",
  kind: "scalar",
  T: 8,
  oneof: "scenario"
}, {
  no: 5,
  name: "switch_candidate_protocol",
  kind: "enum",
  T: g.getEnumType(Ba),
  oneof: "scenario"
}, {
  no: 6,
  name: "subscriber_bandwidth",
  kind: "scalar",
  T: 3,
  oneof: "scenario"
}, {
  no: 7,
  name: "disconnect_signal_on_resume",
  kind: "scalar",
  T: 8,
  oneof: "scenario"
}, {
  no: 8,
  name: "disconnect_signal_on_resume_no_messages",
  kind: "scalar",
  T: 8,
  oneof: "scenario"
}]), Rs = /* @__PURE__ */ g.makeMessageType("livekit.Ping", () => [{
  no: 1,
  name: "timestamp",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}, {
  no: 2,
  name: "rtt",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}]), io = /* @__PURE__ */ g.makeMessageType("livekit.Pong", () => [{
  no: 1,
  name: "last_ping_timestamp",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}, {
  no: 2,
  name: "timestamp",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}]), no = /* @__PURE__ */ g.makeMessageType("livekit.RegionSettings", () => [{
  no: 1,
  name: "regions",
  kind: "message",
  T: so,
  repeated: !0
}]), so = /* @__PURE__ */ g.makeMessageType("livekit.RegionInfo", () => [{
  no: 1,
  name: "region",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "url",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 3,
  name: "distance",
  kind: "scalar",
  T: 3
  /* ScalarType.INT64 */
}]), ro = /* @__PURE__ */ g.makeMessageType("livekit.SubscriptionResponse", () => [{
  no: 1,
  name: "track_sid",
  kind: "scalar",
  T: 9
  /* ScalarType.STRING */
}, {
  no: 2,
  name: "err",
  kind: "enum",
  T: g.getEnumType(xa)
}]);
var ao = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function oo(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Is = { exports: {} };
(function(i) {
  (function(e, t) {
    i.exports ? i.exports = t() : e.log = t();
  })(ao, function() {
    var e = function() {
    }, t = "undefined", n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), s = ["trace", "debug", "info", "warn", "error"], r = {}, a = null;
    function o(y, w) {
      var S = y[w];
      if (typeof S.bind == "function")
        return S.bind(y);
      try {
        return Function.prototype.bind.call(S, y);
      } catch {
        return function() {
          return Function.prototype.apply.apply(S, [y, arguments]);
        };
      }
    }
    function c() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function d(y) {
      return y === "debug" && (y = "log"), typeof console === t ? !1 : y === "trace" && n ? c : console[y] !== void 0 ? o(console, y) : console.log !== void 0 ? o(console, "log") : e;
    }
    function l() {
      for (var y = this.getLevel(), w = 0; w < s.length; w++) {
        var S = s[w];
        this[S] = w < y ? e : this.methodFactory(S, y, this.name);
      }
      if (this.log = this.debug, typeof console === t && y < this.levels.SILENT)
        return "No console available for logging";
    }
    function u(y) {
      return function() {
        typeof console !== t && (l.call(this), this[y].apply(this, arguments));
      };
    }
    function p(y, w, S) {
      return d(y) || u.apply(this, arguments);
    }
    function f(y, w) {
      var S = this, N, U, V, q = "loglevel";
      typeof y == "string" ? q += ":" + y : typeof y == "symbol" && (q = void 0);
      function Xe(O) {
        var G = (s[O] || "silent").toUpperCase();
        if (!(typeof window === t || !q)) {
          try {
            window.localStorage[q] = G;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(q) + "=" + G + ";";
          } catch {
          }
        }
      }
      function A() {
        var O;
        if (!(typeof window === t || !q)) {
          try {
            O = window.localStorage[q];
          } catch {
          }
          if (typeof O === t)
            try {
              var G = window.document.cookie, Tt = encodeURIComponent(q), Zi = G.indexOf(Tt + "=");
              Zi !== -1 && (O = /^([^;]+)/.exec(G.slice(Zi + Tt.length + 1))[1]);
            } catch {
            }
          return S.levels[O] === void 0 && (O = void 0), O;
        }
      }
      function Ze() {
        if (!(typeof window === t || !q)) {
          try {
            window.localStorage.removeItem(q);
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(q) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      function ke(O) {
        var G = O;
        if (typeof G == "string" && S.levels[G.toUpperCase()] !== void 0 && (G = S.levels[G.toUpperCase()]), typeof G == "number" && G >= 0 && G <= S.levels.SILENT)
          return G;
        throw new TypeError("log.setLevel() called with invalid level: " + O);
      }
      S.name = y, S.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, S.methodFactory = w || p, S.getLevel = function() {
        return V != null ? V : U != null ? U : N;
      }, S.setLevel = function(O, G) {
        return V = ke(O), G !== !1 && Xe(V), l.call(S);
      }, S.setDefaultLevel = function(O) {
        U = ke(O), A() || S.setLevel(O, !1);
      }, S.resetLevel = function() {
        V = null, Ze(), l.call(S);
      }, S.enableAll = function(O) {
        S.setLevel(S.levels.TRACE, O);
      }, S.disableAll = function(O) {
        S.setLevel(S.levels.SILENT, O);
      }, S.rebuild = function() {
        if (a !== S && (N = ke(a.getLevel())), l.call(S), a === S)
          for (var O in r)
            r[O].rebuild();
      }, N = ke(a ? a.getLevel() : "WARN");
      var Xi = A();
      Xi != null && (V = ke(Xi)), l.call(S);
    }
    a = new f(), a.getLogger = function(w) {
      if (typeof w != "symbol" && typeof w != "string" || w === "")
        throw new TypeError("You must supply a name when creating a logger.");
      var S = r[w];
      return S || (S = r[w] = new f(w, a.methodFactory)), S;
    };
    var b = typeof window !== t ? window.log : void 0;
    return a.noConflict = function() {
      return typeof window !== t && window.log === a && (window.log = b), a;
    }, a.getLoggers = function() {
      return r;
    }, a.default = a, a;
  });
})(Is);
var kt = Is.exports, xs = /* @__PURE__ */ ((i) => (i[i.trace = 0] = "trace", i[i.debug = 1] = "debug", i[i.info = 2] = "info", i[i.warn = 3] = "warn", i[i.error = 4] = "error", i[i.silent = 5] = "silent", i))(xs || {}), de = /* @__PURE__ */ ((i) => (i.Default = "livekit", i.Room = "livekit-room", i.Participant = "livekit-participant", i.Track = "livekit-track", i.Publication = "livekit-track-publication", i.Engine = "livekit-engine", i.Signal = "livekit-signal", i.PCManager = "livekit-pc-manager", i.PCTransport = "livekit-pc-transport", i.E2EE = "lk-e2ee", i))(de || {});
let I = kt.getLogger("livekit");
const co = Object.values(de).map((i) => kt.getLogger(i));
I.setDefaultLevel(
  2
  /* info */
);
function ve(i) {
  const e = kt.getLogger(i);
  return e.setDefaultLevel(I.getLevel()), e;
}
function lo(i, e) {
  e && kt.getLogger(e).setLevel(i);
  for (const t of co)
    t.setLevel(i);
}
const uo = kt.getLogger("lk-e2ee"), tt = 7e3, ho = [0, 300, 2 * 2 * 300, 3 * 3 * 300, 4 * 4 * 300, tt, tt, tt, tt, tt];
class po {
  constructor(e) {
    this._retryDelays = e !== void 0 ? [...e] : ho;
  }
  nextRetryDelayInMs(e) {
    if (e.retryCount >= this._retryDelays.length)
      return null;
    const t = this._retryDelays[e.retryCount];
    return e.retryCount <= 1 ? t : t + Math.random() * 1e3;
  }
}
function Fe(i) {
  var e, t, n, s = 2;
  for (typeof Symbol != "undefined" && (t = Symbol.asyncIterator, n = Symbol.iterator); s--; ) {
    if (t && (e = i[t]) != null)
      return e.call(i);
    if (n && (e = i[n]) != null)
      return new xt(e.call(i));
    t = "@@asyncIterator", n = "@@iterator";
  }
  throw new TypeError("Object is not async iterable");
}
function xt(i) {
  function e(t) {
    if (Object(t) !== t)
      return Promise.reject(new TypeError(t + " is not an object."));
    var n = t.done;
    return Promise.resolve(t.value).then(function(s) {
      return {
        value: s,
        done: n
      };
    });
  }
  return xt = function(t) {
    this.s = t, this.n = t.next;
  }, xt.prototype = {
    s: null,
    n: null,
    next: function() {
      return e(this.n.apply(this.s, arguments));
    },
    return: function(t) {
      var n = this.s.return;
      return n === void 0 ? Promise.resolve({
        value: t,
        done: !0
      }) : e(n.apply(this.s, arguments));
    },
    throw: function(t) {
      var n = this.s.return;
      return n === void 0 ? Promise.reject(t) : e(n.apply(this.s, arguments));
    }
  }, new xt(i);
}
function gn(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(i);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(i, s).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function h(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? gn(Object(t), !0).forEach(function(n) {
      go(i, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : gn(Object(t)).forEach(function(n) {
      Object.defineProperty(i, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return i;
}
function fo(i, e) {
  if (typeof i != "object" || !i)
    return i;
  var t = i[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(i, e || "default");
    if (typeof n != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(i);
}
function mo(i) {
  var e = fo(i, "string");
  return typeof e == "symbol" ? e : e + "";
}
function go(i, e, t) {
  return e = mo(e), e in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
var qi = { exports: {} }, je = typeof Reflect == "object" ? Reflect : null, vn = je && typeof je.apply == "function" ? je.apply : function(e, t, n) {
  return Function.prototype.apply.call(e, t, n);
}, Mt;
je && typeof je.ownKeys == "function" ? Mt = je.ownKeys : Object.getOwnPropertySymbols ? Mt = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Mt = function(e) {
  return Object.getOwnPropertyNames(e);
};
function vo(i) {
  console && console.warn && console.warn(i);
}
var Ms = Number.isNaN || function(e) {
  return e !== e;
};
function M() {
  M.init.call(this);
}
qi.exports = M;
qi.exports.once = To;
M.EventEmitter = M;
M.prototype._events = void 0;
M.prototype._eventsCount = 0;
M.prototype._maxListeners = void 0;
var bn = 10;
function Wt(i) {
  if (typeof i != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof i);
}
Object.defineProperty(M, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return bn;
  },
  set: function(i) {
    if (typeof i != "number" || i < 0 || Ms(i))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + i + ".");
    bn = i;
  }
});
M.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
M.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || Ms(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function Ds(i) {
  return i._maxListeners === void 0 ? M.defaultMaxListeners : i._maxListeners;
}
M.prototype.getMaxListeners = function() {
  return Ds(this);
};
M.prototype.emit = function(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t.push(arguments[n]);
  var s = e === "error", r = this._events;
  if (r !== void 0)
    s = s && r.error === void 0;
  else if (!s)
    return !1;
  if (s) {
    var a;
    if (t.length > 0 && (a = t[0]), a instanceof Error)
      throw a;
    var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw o.context = a, o;
  }
  var c = r[e];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    vn(c, this, t);
  else
    for (var d = c.length, l = Os(c, d), n = 0; n < d; ++n)
      vn(l[n], this, t);
  return !0;
};
function _s(i, e, t, n) {
  var s, r, a;
  if (Wt(t), r = i._events, r === void 0 ? (r = i._events = /* @__PURE__ */ Object.create(null), i._eventsCount = 0) : (r.newListener !== void 0 && (i.emit("newListener", e, t.listener ? t.listener : t), r = i._events), a = r[e]), a === void 0)
    a = r[e] = t, ++i._eventsCount;
  else if (typeof a == "function" ? a = r[e] = n ? [t, a] : [a, t] : n ? a.unshift(t) : a.push(t), s = Ds(i), s > 0 && a.length > s && !a.warned) {
    a.warned = !0;
    var o = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    o.name = "MaxListenersExceededWarning", o.emitter = i, o.type = e, o.count = a.length, vo(o);
  }
  return i;
}
M.prototype.addListener = function(e, t) {
  return _s(this, e, t, !1);
};
M.prototype.on = M.prototype.addListener;
M.prototype.prependListener = function(e, t) {
  return _s(this, e, t, !0);
};
function bo() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Ls(i, e, t) {
  var n = {
    fired: !1,
    wrapFn: void 0,
    target: i,
    type: e,
    listener: t
  }, s = bo.bind(n);
  return s.listener = t, n.wrapFn = s, s;
}
M.prototype.once = function(e, t) {
  return Wt(t), this.on(e, Ls(this, e, t)), this;
};
M.prototype.prependOnceListener = function(e, t) {
  return Wt(t), this.prependListener(e, Ls(this, e, t)), this;
};
M.prototype.removeListener = function(e, t) {
  var n, s, r, a, o;
  if (Wt(t), s = this._events, s === void 0)
    return this;
  if (n = s[e], n === void 0)
    return this;
  if (n === t || n.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete s[e], s.removeListener && this.emit("removeListener", e, n.listener || t));
  else if (typeof n != "function") {
    for (r = -1, a = n.length - 1; a >= 0; a--)
      if (n[a] === t || n[a].listener === t) {
        o = n[a].listener, r = a;
        break;
      }
    if (r < 0)
      return this;
    r === 0 ? n.shift() : ko(n, r), n.length === 1 && (s[e] = n[0]), s.removeListener !== void 0 && this.emit("removeListener", e, o || t);
  }
  return this;
};
M.prototype.off = M.prototype.removeListener;
M.prototype.removeAllListeners = function(e) {
  var t, n, s;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
  if (arguments.length === 0) {
    var r = Object.keys(n), a;
    for (s = 0; s < r.length; ++s)
      a = r[s], a !== "removeListener" && this.removeAllListeners(a);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = n[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (s = t.length - 1; s >= 0; s--)
      this.removeListener(e, t[s]);
  return this;
};
function As(i, e, t) {
  var n = i._events;
  if (n === void 0)
    return [];
  var s = n[e];
  return s === void 0 ? [] : typeof s == "function" ? t ? [s.listener || s] : [s] : t ? yo(s) : Os(s, s.length);
}
M.prototype.listeners = function(e) {
  return As(this, e, !0);
};
M.prototype.rawListeners = function(e) {
  return As(this, e, !1);
};
M.listenerCount = function(i, e) {
  return typeof i.listenerCount == "function" ? i.listenerCount(e) : Ns.call(i, e);
};
M.prototype.listenerCount = Ns;
function Ns(i) {
  var e = this._events;
  if (e !== void 0) {
    var t = e[i];
    if (typeof t == "function")
      return 1;
    if (t !== void 0)
      return t.length;
  }
  return 0;
}
M.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Mt(this._events) : [];
};
function Os(i, e) {
  for (var t = new Array(e), n = 0; n < e; ++n)
    t[n] = i[n];
  return t;
}
function ko(i, e) {
  for (; e + 1 < i.length; e++)
    i[e] = i[e + 1];
  i.pop();
}
function yo(i) {
  for (var e = new Array(i.length), t = 0; t < e.length; ++t)
    e[t] = i[t].listener || i[t];
  return e;
}
function To(i, e) {
  return new Promise(function(t, n) {
    function s(a) {
      i.removeListener(e, r), n(a);
    }
    function r() {
      typeof i.removeListener == "function" && i.removeListener("error", s), t([].slice.call(arguments));
    }
    Us(i, e, r, {
      once: !0
    }), e !== "error" && So(i, s, {
      once: !0
    });
  });
}
function So(i, e, t) {
  typeof i.on == "function" && Us(i, "error", e, t);
}
function Us(i, e, t, n) {
  if (typeof i.on == "function")
    n.once ? i.once(e, t) : i.on(e, t);
  else if (typeof i.addEventListener == "function")
    i.addEventListener(e, function s(r) {
      n.once && i.removeEventListener(e, s), t(r);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof i);
}
var Pe = qi.exports;
let Fs = !0, Bs = !0;
function Dt(i, e, t) {
  const n = i.match(e);
  return n && n.length >= t && parseInt(n[t], 10);
}
function _e(i, e, t) {
  if (!i.RTCPeerConnection)
    return;
  const n = i.RTCPeerConnection.prototype, s = n.addEventListener;
  n.addEventListener = function(a, o) {
    if (a !== e)
      return s.apply(this, arguments);
    const c = (d) => {
      const l = t(d);
      l && (o.handleEvent ? o.handleEvent(l) : o(l));
    };
    return this._eventMap = this._eventMap || {}, this._eventMap[e] || (this._eventMap[e] = /* @__PURE__ */ new Map()), this._eventMap[e].set(o, c), s.apply(this, [a, c]);
  };
  const r = n.removeEventListener;
  n.removeEventListener = function(a, o) {
    if (a !== e || !this._eventMap || !this._eventMap[e])
      return r.apply(this, arguments);
    if (!this._eventMap[e].has(o))
      return r.apply(this, arguments);
    const c = this._eventMap[e].get(o);
    return this._eventMap[e].delete(o), this._eventMap[e].size === 0 && delete this._eventMap[e], Object.keys(this._eventMap).length === 0 && delete this._eventMap, r.apply(this, [a, c]);
  }, Object.defineProperty(n, "on" + e, {
    get() {
      return this["_on" + e];
    },
    set(a) {
      this["_on" + e] && (this.removeEventListener(e, this["_on" + e]), delete this["_on" + e]), a && this.addEventListener(e, this["_on" + e] = a);
    },
    enumerable: !0,
    configurable: !0
  });
}
function Co(i) {
  return typeof i != "boolean" ? new Error("Argument type: " + typeof i + ". Please use a boolean.") : (Fs = i, i ? "adapter.js logging disabled" : "adapter.js logging enabled");
}
function Po(i) {
  return typeof i != "boolean" ? new Error("Argument type: " + typeof i + ". Please use a boolean.") : (Bs = !i, "adapter.js deprecation warnings " + (i ? "disabled" : "enabled"));
}
function Vs() {
  if (typeof window == "object") {
    if (Fs)
      return;
    typeof console != "undefined" && typeof console.log == "function" && console.log.apply(console, arguments);
  }
}
function Ki(i, e) {
  Bs && console.warn(i + " is deprecated, please use " + e + " instead.");
}
function wo(i) {
  const e = {
    browser: null,
    version: null
  };
  if (typeof i == "undefined" || !i.navigator || !i.navigator.userAgent)
    return e.browser = "Not a browser.", e;
  const {
    navigator: t
  } = i;
  if (t.mozGetUserMedia)
    e.browser = "firefox", e.version = Dt(t.userAgent, /Firefox\/(\d+)\./, 1);
  else if (t.webkitGetUserMedia || i.isSecureContext === !1 && i.webkitRTCPeerConnection)
    e.browser = "chrome", e.version = Dt(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
  else if (i.RTCPeerConnection && t.userAgent.match(/AppleWebKit\/(\d+)\./))
    e.browser = "safari", e.version = Dt(t.userAgent, /AppleWebKit\/(\d+)\./, 1), e.supportsUnifiedPlan = i.RTCRtpTransceiver && "currentDirection" in i.RTCRtpTransceiver.prototype;
  else
    return e.browser = "Not a supported browser.", e;
  return e;
}
function kn(i) {
  return Object.prototype.toString.call(i) === "[object Object]";
}
function qs(i) {
  return kn(i) ? Object.keys(i).reduce(function(e, t) {
    const n = kn(i[t]), s = n ? qs(i[t]) : i[t], r = n && !Object.keys(s).length;
    return s === void 0 || r ? e : Object.assign(e, {
      [t]: s
    });
  }, {}) : i;
}
function gi(i, e, t) {
  !e || t.has(e.id) || (t.set(e.id, e), Object.keys(e).forEach((n) => {
    n.endsWith("Id") ? gi(i, i.get(e[n]), t) : n.endsWith("Ids") && e[n].forEach((s) => {
      gi(i, i.get(s), t);
    });
  }));
}
function yn(i, e, t) {
  const n = t ? "outbound-rtp" : "inbound-rtp", s = /* @__PURE__ */ new Map();
  if (e === null)
    return s;
  const r = [];
  return i.forEach((a) => {
    a.type === "track" && a.trackIdentifier === e.id && r.push(a);
  }), r.forEach((a) => {
    i.forEach((o) => {
      o.type === n && o.trackId === a.id && gi(i, o, s);
    });
  }), s;
}
const Tn = Vs;
function Ks(i, e) {
  const t = i && i.navigator;
  if (!t.mediaDevices)
    return;
  const n = function(o) {
    if (typeof o != "object" || o.mandatory || o.optional)
      return o;
    const c = {};
    return Object.keys(o).forEach((d) => {
      if (d === "require" || d === "advanced" || d === "mediaSource")
        return;
      const l = typeof o[d] == "object" ? o[d] : {
        ideal: o[d]
      };
      l.exact !== void 0 && typeof l.exact == "number" && (l.min = l.max = l.exact);
      const u = function(p, f) {
        return p ? p + f.charAt(0).toUpperCase() + f.slice(1) : f === "deviceId" ? "sourceId" : f;
      };
      if (l.ideal !== void 0) {
        c.optional = c.optional || [];
        let p = {};
        typeof l.ideal == "number" ? (p[u("min", d)] = l.ideal, c.optional.push(p), p = {}, p[u("max", d)] = l.ideal, c.optional.push(p)) : (p[u("", d)] = l.ideal, c.optional.push(p));
      }
      l.exact !== void 0 && typeof l.exact != "number" ? (c.mandatory = c.mandatory || {}, c.mandatory[u("", d)] = l.exact) : ["min", "max"].forEach((p) => {
        l[p] !== void 0 && (c.mandatory = c.mandatory || {}, c.mandatory[u(p, d)] = l[p]);
      });
    }), o.advanced && (c.optional = (c.optional || []).concat(o.advanced)), c;
  }, s = function(o, c) {
    if (e.version >= 61)
      return c(o);
    if (o = JSON.parse(JSON.stringify(o)), o && typeof o.audio == "object") {
      const d = function(l, u, p) {
        u in l && !(p in l) && (l[p] = l[u], delete l[u]);
      };
      o = JSON.parse(JSON.stringify(o)), d(o.audio, "autoGainControl", "googAutoGainControl"), d(o.audio, "noiseSuppression", "googNoiseSuppression"), o.audio = n(o.audio);
    }
    if (o && typeof o.video == "object") {
      let d = o.video.facingMode;
      d = d && (typeof d == "object" ? d : {
        ideal: d
      });
      const l = e.version < 66;
      if (d && (d.exact === "user" || d.exact === "environment" || d.ideal === "user" || d.ideal === "environment") && !(t.mediaDevices.getSupportedConstraints && t.mediaDevices.getSupportedConstraints().facingMode && !l)) {
        delete o.video.facingMode;
        let u;
        if (d.exact === "environment" || d.ideal === "environment" ? u = ["back", "rear"] : (d.exact === "user" || d.ideal === "user") && (u = ["front"]), u)
          return t.mediaDevices.enumerateDevices().then((p) => {
            p = p.filter((b) => b.kind === "videoinput");
            let f = p.find((b) => u.some((y) => b.label.toLowerCase().includes(y)));
            return !f && p.length && u.includes("back") && (f = p[p.length - 1]), f && (o.video.deviceId = d.exact ? {
              exact: f.deviceId
            } : {
              ideal: f.deviceId
            }), o.video = n(o.video), Tn("chrome: " + JSON.stringify(o)), c(o);
          });
      }
      o.video = n(o.video);
    }
    return Tn("chrome: " + JSON.stringify(o)), c(o);
  }, r = function(o) {
    return e.version >= 64 ? o : {
      name: {
        PermissionDeniedError: "NotAllowedError",
        PermissionDismissedError: "NotAllowedError",
        InvalidStateError: "NotAllowedError",
        DevicesNotFoundError: "NotFoundError",
        ConstraintNotSatisfiedError: "OverconstrainedError",
        TrackStartError: "NotReadableError",
        MediaDeviceFailedDueToShutdown: "NotAllowedError",
        MediaDeviceKillSwitchOn: "NotAllowedError",
        TabCaptureError: "AbortError",
        ScreenCaptureError: "AbortError",
        DeviceCaptureError: "AbortError"
      }[o.name] || o.name,
      message: o.message,
      constraint: o.constraint || o.constraintName,
      toString() {
        return this.name + (this.message && ": ") + this.message;
      }
    };
  }, a = function(o, c, d) {
    s(o, (l) => {
      t.webkitGetUserMedia(l, c, (u) => {
        d && d(r(u));
      });
    });
  };
  if (t.getUserMedia = a.bind(t), t.mediaDevices.getUserMedia) {
    const o = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
    t.mediaDevices.getUserMedia = function(c) {
      return s(c, (d) => o(d).then((l) => {
        if (d.audio && !l.getAudioTracks().length || d.video && !l.getVideoTracks().length)
          throw l.getTracks().forEach((u) => {
            u.stop();
          }), new DOMException("", "NotFoundError");
        return l;
      }, (l) => Promise.reject(r(l))));
    };
  }
}
function Eo(i, e) {
  if (!(i.navigator.mediaDevices && "getDisplayMedia" in i.navigator.mediaDevices) && i.navigator.mediaDevices) {
    if (typeof e != "function") {
      console.error("shimGetDisplayMedia: getSourceId argument is not a function");
      return;
    }
    i.navigator.mediaDevices.getDisplayMedia = function(n) {
      return e(n).then((s) => {
        const r = n.video && n.video.width, a = n.video && n.video.height, o = n.video && n.video.frameRate;
        return n.video = {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: s,
            maxFrameRate: o || 3
          }
        }, r && (n.video.mandatory.maxWidth = r), a && (n.video.mandatory.maxHeight = a), i.navigator.mediaDevices.getUserMedia(n);
      });
    };
  }
}
function js(i) {
  i.MediaStream = i.MediaStream || i.webkitMediaStream;
}
function Gs(i) {
  if (typeof i == "object" && i.RTCPeerConnection && !("ontrack" in i.RTCPeerConnection.prototype)) {
    Object.defineProperty(i.RTCPeerConnection.prototype, "ontrack", {
      get() {
        return this._ontrack;
      },
      set(t) {
        this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = t);
      },
      enumerable: !0,
      configurable: !0
    });
    const e = i.RTCPeerConnection.prototype.setRemoteDescription;
    i.RTCPeerConnection.prototype.setRemoteDescription = function() {
      return this._ontrackpoly || (this._ontrackpoly = (n) => {
        n.stream.addEventListener("addtrack", (s) => {
          let r;
          i.RTCPeerConnection.prototype.getReceivers ? r = this.getReceivers().find((o) => o.track && o.track.id === s.track.id) : r = {
            track: s.track
          };
          const a = new Event("track");
          a.track = s.track, a.receiver = r, a.transceiver = {
            receiver: r
          }, a.streams = [n.stream], this.dispatchEvent(a);
        }), n.stream.getTracks().forEach((s) => {
          let r;
          i.RTCPeerConnection.prototype.getReceivers ? r = this.getReceivers().find((o) => o.track && o.track.id === s.id) : r = {
            track: s
          };
          const a = new Event("track");
          a.track = s, a.receiver = r, a.transceiver = {
            receiver: r
          }, a.streams = [n.stream], this.dispatchEvent(a);
        });
      }, this.addEventListener("addstream", this._ontrackpoly)), e.apply(this, arguments);
    };
  } else
    _e(i, "track", (e) => (e.transceiver || Object.defineProperty(e, "transceiver", {
      value: {
        receiver: e.receiver
      }
    }), e));
}
function Hs(i) {
  if (typeof i == "object" && i.RTCPeerConnection && !("getSenders" in i.RTCPeerConnection.prototype) && "createDTMFSender" in i.RTCPeerConnection.prototype) {
    const e = function(s, r) {
      return {
        track: r,
        get dtmf() {
          return this._dtmf === void 0 && (r.kind === "audio" ? this._dtmf = s.createDTMFSender(r) : this._dtmf = null), this._dtmf;
        },
        _pc: s
      };
    };
    if (!i.RTCPeerConnection.prototype.getSenders) {
      i.RTCPeerConnection.prototype.getSenders = function() {
        return this._senders = this._senders || [], this._senders.slice();
      };
      const s = i.RTCPeerConnection.prototype.addTrack;
      i.RTCPeerConnection.prototype.addTrack = function(o, c) {
        let d = s.apply(this, arguments);
        return d || (d = e(this, o), this._senders.push(d)), d;
      };
      const r = i.RTCPeerConnection.prototype.removeTrack;
      i.RTCPeerConnection.prototype.removeTrack = function(o) {
        r.apply(this, arguments);
        const c = this._senders.indexOf(o);
        c !== -1 && this._senders.splice(c, 1);
      };
    }
    const t = i.RTCPeerConnection.prototype.addStream;
    i.RTCPeerConnection.prototype.addStream = function(r) {
      this._senders = this._senders || [], t.apply(this, [r]), r.getTracks().forEach((a) => {
        this._senders.push(e(this, a));
      });
    };
    const n = i.RTCPeerConnection.prototype.removeStream;
    i.RTCPeerConnection.prototype.removeStream = function(r) {
      this._senders = this._senders || [], n.apply(this, [r]), r.getTracks().forEach((a) => {
        const o = this._senders.find((c) => c.track === a);
        o && this._senders.splice(this._senders.indexOf(o), 1);
      });
    };
  } else if (typeof i == "object" && i.RTCPeerConnection && "getSenders" in i.RTCPeerConnection.prototype && "createDTMFSender" in i.RTCPeerConnection.prototype && i.RTCRtpSender && !("dtmf" in i.RTCRtpSender.prototype)) {
    const e = i.RTCPeerConnection.prototype.getSenders;
    i.RTCPeerConnection.prototype.getSenders = function() {
      const n = e.apply(this, []);
      return n.forEach((s) => s._pc = this), n;
    }, Object.defineProperty(i.RTCRtpSender.prototype, "dtmf", {
      get() {
        return this._dtmf === void 0 && (this.track.kind === "audio" ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
      }
    });
  }
}
function zs(i) {
  if (!i.RTCPeerConnection)
    return;
  const e = i.RTCPeerConnection.prototype.getStats;
  i.RTCPeerConnection.prototype.getStats = function() {
    const [n, s, r] = arguments;
    if (arguments.length > 0 && typeof n == "function")
      return e.apply(this, arguments);
    if (e.length === 0 && (arguments.length === 0 || typeof n != "function"))
      return e.apply(this, []);
    const a = function(c) {
      const d = {};
      return c.result().forEach((u) => {
        const p = {
          id: u.id,
          timestamp: u.timestamp,
          type: {
            localcandidate: "local-candidate",
            remotecandidate: "remote-candidate"
          }[u.type] || u.type
        };
        u.names().forEach((f) => {
          p[f] = u.stat(f);
        }), d[p.id] = p;
      }), d;
    }, o = function(c) {
      return new Map(Object.keys(c).map((d) => [d, c[d]]));
    };
    if (arguments.length >= 2) {
      const c = function(d) {
        s(o(a(d)));
      };
      return e.apply(this, [c, n]);
    }
    return new Promise((c, d) => {
      e.apply(this, [function(l) {
        c(o(a(l)));
      }, d]);
    }).then(s, r);
  };
}
function Ws(i) {
  if (!(typeof i == "object" && i.RTCPeerConnection && i.RTCRtpSender && i.RTCRtpReceiver))
    return;
  if (!("getStats" in i.RTCRtpSender.prototype)) {
    const t = i.RTCPeerConnection.prototype.getSenders;
    t && (i.RTCPeerConnection.prototype.getSenders = function() {
      const r = t.apply(this, []);
      return r.forEach((a) => a._pc = this), r;
    });
    const n = i.RTCPeerConnection.prototype.addTrack;
    n && (i.RTCPeerConnection.prototype.addTrack = function() {
      const r = n.apply(this, arguments);
      return r._pc = this, r;
    }), i.RTCRtpSender.prototype.getStats = function() {
      const r = this;
      return this._pc.getStats().then((a) => (
        /* Note: this will include stats of all senders that
         *   send a track with the same id as sender.track as
         *   it is not possible to identify the RTCRtpSender.
         */
        yn(a, r.track, !0)
      ));
    };
  }
  if (!("getStats" in i.RTCRtpReceiver.prototype)) {
    const t = i.RTCPeerConnection.prototype.getReceivers;
    t && (i.RTCPeerConnection.prototype.getReceivers = function() {
      const s = t.apply(this, []);
      return s.forEach((r) => r._pc = this), s;
    }), _e(i, "track", (n) => (n.receiver._pc = n.srcElement, n)), i.RTCRtpReceiver.prototype.getStats = function() {
      const s = this;
      return this._pc.getStats().then((r) => yn(r, s.track, !1));
    };
  }
  if (!("getStats" in i.RTCRtpSender.prototype && "getStats" in i.RTCRtpReceiver.prototype))
    return;
  const e = i.RTCPeerConnection.prototype.getStats;
  i.RTCPeerConnection.prototype.getStats = function() {
    if (arguments.length > 0 && arguments[0] instanceof i.MediaStreamTrack) {
      const n = arguments[0];
      let s, r, a;
      return this.getSenders().forEach((o) => {
        o.track === n && (s ? a = !0 : s = o);
      }), this.getReceivers().forEach((o) => (o.track === n && (r ? a = !0 : r = o), o.track === n)), a || s && r ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : s ? s.getStats() : r ? r.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
    }
    return e.apply(this, arguments);
  };
}
function Js(i) {
  i.RTCPeerConnection.prototype.getLocalStreams = function() {
    return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map((a) => this._shimmedLocalStreams[a][0]);
  };
  const e = i.RTCPeerConnection.prototype.addTrack;
  i.RTCPeerConnection.prototype.addTrack = function(a, o) {
    if (!o)
      return e.apply(this, arguments);
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    const c = e.apply(this, arguments);
    return this._shimmedLocalStreams[o.id] ? this._shimmedLocalStreams[o.id].indexOf(c) === -1 && this._shimmedLocalStreams[o.id].push(c) : this._shimmedLocalStreams[o.id] = [o, c], c;
  };
  const t = i.RTCPeerConnection.prototype.addStream;
  i.RTCPeerConnection.prototype.addStream = function(a) {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {}, a.getTracks().forEach((d) => {
      if (this.getSenders().find((u) => u.track === d))
        throw new DOMException("Track already exists.", "InvalidAccessError");
    });
    const o = this.getSenders();
    t.apply(this, arguments);
    const c = this.getSenders().filter((d) => o.indexOf(d) === -1);
    this._shimmedLocalStreams[a.id] = [a].concat(c);
  };
  const n = i.RTCPeerConnection.prototype.removeStream;
  i.RTCPeerConnection.prototype.removeStream = function(a) {
    return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[a.id], n.apply(this, arguments);
  };
  const s = i.RTCPeerConnection.prototype.removeTrack;
  i.RTCPeerConnection.prototype.removeTrack = function(a) {
    return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, a && Object.keys(this._shimmedLocalStreams).forEach((o) => {
      const c = this._shimmedLocalStreams[o].indexOf(a);
      c !== -1 && this._shimmedLocalStreams[o].splice(c, 1), this._shimmedLocalStreams[o].length === 1 && delete this._shimmedLocalStreams[o];
    }), s.apply(this, arguments);
  };
}
function Qs(i, e) {
  if (!i.RTCPeerConnection)
    return;
  if (i.RTCPeerConnection.prototype.addTrack && e.version >= 65)
    return Js(i);
  const t = i.RTCPeerConnection.prototype.getLocalStreams;
  i.RTCPeerConnection.prototype.getLocalStreams = function() {
    const l = t.apply(this);
    return this._reverseStreams = this._reverseStreams || {}, l.map((u) => this._reverseStreams[u.id]);
  };
  const n = i.RTCPeerConnection.prototype.addStream;
  i.RTCPeerConnection.prototype.addStream = function(l) {
    if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, l.getTracks().forEach((u) => {
      if (this.getSenders().find((f) => f.track === u))
        throw new DOMException("Track already exists.", "InvalidAccessError");
    }), !this._reverseStreams[l.id]) {
      const u = new i.MediaStream(l.getTracks());
      this._streams[l.id] = u, this._reverseStreams[u.id] = l, l = u;
    }
    n.apply(this, [l]);
  };
  const s = i.RTCPeerConnection.prototype.removeStream;
  i.RTCPeerConnection.prototype.removeStream = function(l) {
    this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, s.apply(this, [this._streams[l.id] || l]), delete this._reverseStreams[this._streams[l.id] ? this._streams[l.id].id : l.id], delete this._streams[l.id];
  }, i.RTCPeerConnection.prototype.addTrack = function(l, u) {
    if (this.signalingState === "closed")
      throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
    const p = [].slice.call(arguments, 1);
    if (p.length !== 1 || !p[0].getTracks().find((y) => y === l))
      throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
    if (this.getSenders().find((y) => y.track === l))
      throw new DOMException("Track already exists.", "InvalidAccessError");
    this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
    const b = this._streams[u.id];
    if (b)
      b.addTrack(l), Promise.resolve().then(() => {
        this.dispatchEvent(new Event("negotiationneeded"));
      });
    else {
      const y = new i.MediaStream([l]);
      this._streams[u.id] = y, this._reverseStreams[y.id] = u, this.addStream(y);
    }
    return this.getSenders().find((y) => y.track === l);
  };
  function r(d, l) {
    let u = l.sdp;
    return Object.keys(d._reverseStreams || []).forEach((p) => {
      const f = d._reverseStreams[p], b = d._streams[f.id];
      u = u.replace(new RegExp(b.id, "g"), f.id);
    }), new RTCSessionDescription({
      type: l.type,
      sdp: u
    });
  }
  function a(d, l) {
    let u = l.sdp;
    return Object.keys(d._reverseStreams || []).forEach((p) => {
      const f = d._reverseStreams[p], b = d._streams[f.id];
      u = u.replace(new RegExp(f.id, "g"), b.id);
    }), new RTCSessionDescription({
      type: l.type,
      sdp: u
    });
  }
  ["createOffer", "createAnswer"].forEach(function(d) {
    const l = i.RTCPeerConnection.prototype[d], u = {
      [d]() {
        const p = arguments;
        return arguments.length && typeof arguments[0] == "function" ? l.apply(this, [(b) => {
          const y = r(this, b);
          p[0].apply(null, [y]);
        }, (b) => {
          p[1] && p[1].apply(null, b);
        }, arguments[2]]) : l.apply(this, arguments).then((b) => r(this, b));
      }
    };
    i.RTCPeerConnection.prototype[d] = u[d];
  });
  const o = i.RTCPeerConnection.prototype.setLocalDescription;
  i.RTCPeerConnection.prototype.setLocalDescription = function() {
    return !arguments.length || !arguments[0].type ? o.apply(this, arguments) : (arguments[0] = a(this, arguments[0]), o.apply(this, arguments));
  };
  const c = Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype, "localDescription");
  Object.defineProperty(i.RTCPeerConnection.prototype, "localDescription", {
    get() {
      const d = c.get.apply(this);
      return d.type === "" ? d : r(this, d);
    }
  }), i.RTCPeerConnection.prototype.removeTrack = function(l) {
    if (this.signalingState === "closed")
      throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
    if (!l._pc)
      throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
    if (!(l._pc === this))
      throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
    this._streams = this._streams || {};
    let p;
    Object.keys(this._streams).forEach((f) => {
      this._streams[f].getTracks().find((y) => l.track === y) && (p = this._streams[f]);
    }), p && (p.getTracks().length === 1 ? this.removeStream(this._reverseStreams[p.id]) : p.removeTrack(l.track), this.dispatchEvent(new Event("negotiationneeded")));
  };
}
function vi(i, e) {
  !i.RTCPeerConnection && i.webkitRTCPeerConnection && (i.RTCPeerConnection = i.webkitRTCPeerConnection), i.RTCPeerConnection && e.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
    const n = i.RTCPeerConnection.prototype[t], s = {
      [t]() {
        return arguments[0] = new (t === "addIceCandidate" ? i.RTCIceCandidate : i.RTCSessionDescription)(arguments[0]), n.apply(this, arguments);
      }
    };
    i.RTCPeerConnection.prototype[t] = s[t];
  });
}
function $s(i, e) {
  _e(i, "negotiationneeded", (t) => {
    const n = t.target;
    if (!((e.version < 72 || n.getConfiguration && n.getConfiguration().sdpSemantics === "plan-b") && n.signalingState !== "stable"))
      return t;
  });
}
const Sn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fixNegotiationNeeded: $s,
  shimAddTrackRemoveTrack: Qs,
  shimAddTrackRemoveTrackWithNative: Js,
  shimGetDisplayMedia: Eo,
  shimGetSendersWithDtmf: Hs,
  shimGetStats: zs,
  shimGetUserMedia: Ks,
  shimMediaStream: js,
  shimOnTrack: Gs,
  shimPeerConnection: vi,
  shimSenderReceiverGetStats: Ws
}, Symbol.toStringTag, { value: "Module" }));
function Ys(i, e) {
  const t = i && i.navigator, n = i && i.MediaStreamTrack;
  if (t.getUserMedia = function(s, r, a) {
    Ki("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), t.mediaDevices.getUserMedia(s).then(r, a);
  }, !(e.version > 55 && "autoGainControl" in t.mediaDevices.getSupportedConstraints())) {
    const s = function(a, o, c) {
      o in a && !(c in a) && (a[c] = a[o], delete a[o]);
    }, r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
    if (t.mediaDevices.getUserMedia = function(a) {
      return typeof a == "object" && typeof a.audio == "object" && (a = JSON.parse(JSON.stringify(a)), s(a.audio, "autoGainControl", "mozAutoGainControl"), s(a.audio, "noiseSuppression", "mozNoiseSuppression")), r(a);
    }, n && n.prototype.getSettings) {
      const a = n.prototype.getSettings;
      n.prototype.getSettings = function() {
        const o = a.apply(this, arguments);
        return s(o, "mozAutoGainControl", "autoGainControl"), s(o, "mozNoiseSuppression", "noiseSuppression"), o;
      };
    }
    if (n && n.prototype.applyConstraints) {
      const a = n.prototype.applyConstraints;
      n.prototype.applyConstraints = function(o) {
        return this.kind === "audio" && typeof o == "object" && (o = JSON.parse(JSON.stringify(o)), s(o, "autoGainControl", "mozAutoGainControl"), s(o, "noiseSuppression", "mozNoiseSuppression")), a.apply(this, [o]);
      };
    }
  }
}
function Ro(i, e) {
  i.navigator.mediaDevices && "getDisplayMedia" in i.navigator.mediaDevices || i.navigator.mediaDevices && (i.navigator.mediaDevices.getDisplayMedia = function(n) {
    if (!(n && n.video)) {
      const s = new DOMException("getDisplayMedia without video constraints is undefined");
      return s.name = "NotFoundError", s.code = 8, Promise.reject(s);
    }
    return n.video === !0 ? n.video = {
      mediaSource: e
    } : n.video.mediaSource = e, i.navigator.mediaDevices.getUserMedia(n);
  });
}
function Xs(i) {
  typeof i == "object" && i.RTCTrackEvent && "receiver" in i.RTCTrackEvent.prototype && !("transceiver" in i.RTCTrackEvent.prototype) && Object.defineProperty(i.RTCTrackEvent.prototype, "transceiver", {
    get() {
      return {
        receiver: this.receiver
      };
    }
  });
}
function bi(i, e) {
  if (typeof i != "object" || !(i.RTCPeerConnection || i.mozRTCPeerConnection))
    return;
  !i.RTCPeerConnection && i.mozRTCPeerConnection && (i.RTCPeerConnection = i.mozRTCPeerConnection), e.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(s) {
    const r = i.RTCPeerConnection.prototype[s], a = {
      [s]() {
        return arguments[0] = new (s === "addIceCandidate" ? i.RTCIceCandidate : i.RTCSessionDescription)(arguments[0]), r.apply(this, arguments);
      }
    };
    i.RTCPeerConnection.prototype[s] = a[s];
  });
  const t = {
    inboundrtp: "inbound-rtp",
    outboundrtp: "outbound-rtp",
    candidatepair: "candidate-pair",
    localcandidate: "local-candidate",
    remotecandidate: "remote-candidate"
  }, n = i.RTCPeerConnection.prototype.getStats;
  i.RTCPeerConnection.prototype.getStats = function() {
    const [r, a, o] = arguments;
    return n.apply(this, [r || null]).then((c) => {
      if (e.version < 53 && !a)
        try {
          c.forEach((d) => {
            d.type = t[d.type] || d.type;
          });
        } catch (d) {
          if (d.name !== "TypeError")
            throw d;
          c.forEach((l, u) => {
            c.set(u, Object.assign({}, l, {
              type: t[l.type] || l.type
            }));
          });
        }
      return c;
    }).then(a, o);
  };
}
function Zs(i) {
  if (!(typeof i == "object" && i.RTCPeerConnection && i.RTCRtpSender) || i.RTCRtpSender && "getStats" in i.RTCRtpSender.prototype)
    return;
  const e = i.RTCPeerConnection.prototype.getSenders;
  e && (i.RTCPeerConnection.prototype.getSenders = function() {
    const s = e.apply(this, []);
    return s.forEach((r) => r._pc = this), s;
  });
  const t = i.RTCPeerConnection.prototype.addTrack;
  t && (i.RTCPeerConnection.prototype.addTrack = function() {
    const s = t.apply(this, arguments);
    return s._pc = this, s;
  }), i.RTCRtpSender.prototype.getStats = function() {
    return this.track ? this._pc.getStats(this.track) : Promise.resolve(/* @__PURE__ */ new Map());
  };
}
function er(i) {
  if (!(typeof i == "object" && i.RTCPeerConnection && i.RTCRtpSender) || i.RTCRtpSender && "getStats" in i.RTCRtpReceiver.prototype)
    return;
  const e = i.RTCPeerConnection.prototype.getReceivers;
  e && (i.RTCPeerConnection.prototype.getReceivers = function() {
    const n = e.apply(this, []);
    return n.forEach((s) => s._pc = this), n;
  }), _e(i, "track", (t) => (t.receiver._pc = t.srcElement, t)), i.RTCRtpReceiver.prototype.getStats = function() {
    return this._pc.getStats(this.track);
  };
}
function tr(i) {
  !i.RTCPeerConnection || "removeStream" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.removeStream = function(t) {
    Ki("removeStream", "removeTrack"), this.getSenders().forEach((n) => {
      n.track && t.getTracks().includes(n.track) && this.removeTrack(n);
    });
  });
}
function ir(i) {
  i.DataChannel && !i.RTCDataChannel && (i.RTCDataChannel = i.DataChannel);
}
function nr(i) {
  if (!(typeof i == "object" && i.RTCPeerConnection))
    return;
  const e = i.RTCPeerConnection.prototype.addTransceiver;
  e && (i.RTCPeerConnection.prototype.addTransceiver = function() {
    this.setParametersPromises = [];
    let n = arguments[1] && arguments[1].sendEncodings;
    n === void 0 && (n = []), n = [...n];
    const s = n.length > 0;
    s && n.forEach((a) => {
      if ("rid" in a && !/^[a-z0-9]{0,16}$/i.test(a.rid))
        throw new TypeError("Invalid RID value provided.");
      if ("scaleResolutionDownBy" in a && !(parseFloat(a.scaleResolutionDownBy) >= 1))
        throw new RangeError("scale_resolution_down_by must be >= 1.0");
      if ("maxFramerate" in a && !(parseFloat(a.maxFramerate) >= 0))
        throw new RangeError("max_framerate must be >= 0.0");
    });
    const r = e.apply(this, arguments);
    if (s) {
      const {
        sender: a
      } = r, o = a.getParameters();
      (!("encodings" in o) || // Avoid being fooled by patched getParameters() below.
      o.encodings.length === 1 && Object.keys(o.encodings[0]).length === 0) && (o.encodings = n, a.sendEncodings = n, this.setParametersPromises.push(a.setParameters(o).then(() => {
        delete a.sendEncodings;
      }).catch(() => {
        delete a.sendEncodings;
      })));
    }
    return r;
  });
}
function sr(i) {
  if (!(typeof i == "object" && i.RTCRtpSender))
    return;
  const e = i.RTCRtpSender.prototype.getParameters;
  e && (i.RTCRtpSender.prototype.getParameters = function() {
    const n = e.apply(this, arguments);
    return "encodings" in n || (n.encodings = [].concat(this.sendEncodings || [{}])), n;
  });
}
function rr(i) {
  if (!(typeof i == "object" && i.RTCPeerConnection))
    return;
  const e = i.RTCPeerConnection.prototype.createOffer;
  i.RTCPeerConnection.prototype.createOffer = function() {
    return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => e.apply(this, arguments)).finally(() => {
      this.setParametersPromises = [];
    }) : e.apply(this, arguments);
  };
}
function ar(i) {
  if (!(typeof i == "object" && i.RTCPeerConnection))
    return;
  const e = i.RTCPeerConnection.prototype.createAnswer;
  i.RTCPeerConnection.prototype.createAnswer = function() {
    return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => e.apply(this, arguments)).finally(() => {
      this.setParametersPromises = [];
    }) : e.apply(this, arguments);
  };
}
const Cn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  shimAddTransceiver: nr,
  shimCreateAnswer: ar,
  shimCreateOffer: rr,
  shimGetDisplayMedia: Ro,
  shimGetParameters: sr,
  shimGetUserMedia: Ys,
  shimOnTrack: Xs,
  shimPeerConnection: bi,
  shimRTCDataChannel: ir,
  shimReceiverGetStats: er,
  shimRemoveStream: tr,
  shimSenderGetStats: Zs
}, Symbol.toStringTag, { value: "Module" }));
function or(i) {
  if (!(typeof i != "object" || !i.RTCPeerConnection)) {
    if ("getLocalStreams" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.getLocalStreams = function() {
      return this._localStreams || (this._localStreams = []), this._localStreams;
    }), !("addStream" in i.RTCPeerConnection.prototype)) {
      const e = i.RTCPeerConnection.prototype.addTrack;
      i.RTCPeerConnection.prototype.addStream = function(n) {
        this._localStreams || (this._localStreams = []), this._localStreams.includes(n) || this._localStreams.push(n), n.getAudioTracks().forEach((s) => e.call(this, s, n)), n.getVideoTracks().forEach((s) => e.call(this, s, n));
      }, i.RTCPeerConnection.prototype.addTrack = function(n) {
        for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), a = 1; a < s; a++)
          r[a - 1] = arguments[a];
        return r && r.forEach((o) => {
          this._localStreams ? this._localStreams.includes(o) || this._localStreams.push(o) : this._localStreams = [o];
        }), e.apply(this, arguments);
      };
    }
    "removeStream" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.removeStream = function(t) {
      this._localStreams || (this._localStreams = []);
      const n = this._localStreams.indexOf(t);
      if (n === -1)
        return;
      this._localStreams.splice(n, 1);
      const s = t.getTracks();
      this.getSenders().forEach((r) => {
        s.includes(r.track) && this.removeTrack(r);
      });
    });
  }
}
function cr(i) {
  if (!(typeof i != "object" || !i.RTCPeerConnection) && ("getRemoteStreams" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.getRemoteStreams = function() {
    return this._remoteStreams ? this._remoteStreams : [];
  }), !("onaddstream" in i.RTCPeerConnection.prototype))) {
    Object.defineProperty(i.RTCPeerConnection.prototype, "onaddstream", {
      get() {
        return this._onaddstream;
      },
      set(t) {
        this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = t), this.addEventListener("track", this._onaddstreampoly = (n) => {
          n.streams.forEach((s) => {
            if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(s))
              return;
            this._remoteStreams.push(s);
            const r = new Event("addstream");
            r.stream = s, this.dispatchEvent(r);
          });
        });
      }
    });
    const e = i.RTCPeerConnection.prototype.setRemoteDescription;
    i.RTCPeerConnection.prototype.setRemoteDescription = function() {
      const n = this;
      return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(s) {
        s.streams.forEach((r) => {
          if (n._remoteStreams || (n._remoteStreams = []), n._remoteStreams.indexOf(r) >= 0)
            return;
          n._remoteStreams.push(r);
          const a = new Event("addstream");
          a.stream = r, n.dispatchEvent(a);
        });
      }), e.apply(n, arguments);
    };
  }
}
function dr(i) {
  if (typeof i != "object" || !i.RTCPeerConnection)
    return;
  const e = i.RTCPeerConnection.prototype, t = e.createOffer, n = e.createAnswer, s = e.setLocalDescription, r = e.setRemoteDescription, a = e.addIceCandidate;
  e.createOffer = function(d, l) {
    const u = arguments.length >= 2 ? arguments[2] : arguments[0], p = t.apply(this, [u]);
    return l ? (p.then(d, l), Promise.resolve()) : p;
  }, e.createAnswer = function(d, l) {
    const u = arguments.length >= 2 ? arguments[2] : arguments[0], p = n.apply(this, [u]);
    return l ? (p.then(d, l), Promise.resolve()) : p;
  };
  let o = function(c, d, l) {
    const u = s.apply(this, [c]);
    return l ? (u.then(d, l), Promise.resolve()) : u;
  };
  e.setLocalDescription = o, o = function(c, d, l) {
    const u = r.apply(this, [c]);
    return l ? (u.then(d, l), Promise.resolve()) : u;
  }, e.setRemoteDescription = o, o = function(c, d, l) {
    const u = a.apply(this, [c]);
    return l ? (u.then(d, l), Promise.resolve()) : u;
  }, e.addIceCandidate = o;
}
function lr(i) {
  const e = i && i.navigator;
  if (e.mediaDevices && e.mediaDevices.getUserMedia) {
    const t = e.mediaDevices, n = t.getUserMedia.bind(t);
    e.mediaDevices.getUserMedia = (s) => n(ur(s));
  }
  !e.getUserMedia && e.mediaDevices && e.mediaDevices.getUserMedia && (e.getUserMedia = function(n, s, r) {
    e.mediaDevices.getUserMedia(n).then(s, r);
  }.bind(e));
}
function ur(i) {
  return i && i.video !== void 0 ? Object.assign({}, i, {
    video: qs(i.video)
  }) : i;
}
function hr(i) {
  if (!i.RTCPeerConnection)
    return;
  const e = i.RTCPeerConnection;
  i.RTCPeerConnection = function(n, s) {
    if (n && n.iceServers) {
      const r = [];
      for (let a = 0; a < n.iceServers.length; a++) {
        let o = n.iceServers[a];
        o.urls === void 0 && o.url ? (Ki("RTCIceServer.url", "RTCIceServer.urls"), o = JSON.parse(JSON.stringify(o)), o.urls = o.url, delete o.url, r.push(o)) : r.push(n.iceServers[a]);
      }
      n.iceServers = r;
    }
    return new e(n, s);
  }, i.RTCPeerConnection.prototype = e.prototype, "generateCertificate" in e && Object.defineProperty(i.RTCPeerConnection, "generateCertificate", {
    get() {
      return e.generateCertificate;
    }
  });
}
function pr(i) {
  typeof i == "object" && i.RTCTrackEvent && "receiver" in i.RTCTrackEvent.prototype && !("transceiver" in i.RTCTrackEvent.prototype) && Object.defineProperty(i.RTCTrackEvent.prototype, "transceiver", {
    get() {
      return {
        receiver: this.receiver
      };
    }
  });
}
function fr(i) {
  const e = i.RTCPeerConnection.prototype.createOffer;
  i.RTCPeerConnection.prototype.createOffer = function(n) {
    if (n) {
      typeof n.offerToReceiveAudio != "undefined" && (n.offerToReceiveAudio = !!n.offerToReceiveAudio);
      const s = this.getTransceivers().find((a) => a.receiver.track.kind === "audio");
      n.offerToReceiveAudio === !1 && s ? s.direction === "sendrecv" ? s.setDirection ? s.setDirection("sendonly") : s.direction = "sendonly" : s.direction === "recvonly" && (s.setDirection ? s.setDirection("inactive") : s.direction = "inactive") : n.offerToReceiveAudio === !0 && !s && this.addTransceiver("audio", {
        direction: "recvonly"
      }), typeof n.offerToReceiveVideo != "undefined" && (n.offerToReceiveVideo = !!n.offerToReceiveVideo);
      const r = this.getTransceivers().find((a) => a.receiver.track.kind === "video");
      n.offerToReceiveVideo === !1 && r ? r.direction === "sendrecv" ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly" : r.direction === "recvonly" && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : n.offerToReceiveVideo === !0 && !r && this.addTransceiver("video", {
        direction: "recvonly"
      });
    }
    return e.apply(this, arguments);
  };
}
function mr(i) {
  typeof i != "object" || i.AudioContext || (i.AudioContext = i.webkitAudioContext);
}
const Pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  shimAudioContext: mr,
  shimCallbacksAPI: dr,
  shimConstraints: ur,
  shimCreateOfferLegacy: fr,
  shimGetUserMedia: lr,
  shimLocalStreamsAPI: or,
  shimRTCIceServerUrls: hr,
  shimRemoteStreamsAPI: cr,
  shimTrackEventTransceiver: pr
}, Symbol.toStringTag, { value: "Module" }));
var gr = { exports: {} };
(function(i) {
  const e = {};
  e.generateIdentifier = function() {
    return Math.random().toString(36).substring(2, 12);
  }, e.localCName = e.generateIdentifier(), e.splitLines = function(t) {
    return t.trim().split(`
`).map((n) => n.trim());
  }, e.splitSections = function(t) {
    return t.split(`
m=`).map((s, r) => (r > 0 ? "m=" + s : s).trim() + `\r
`);
  }, e.getDescription = function(t) {
    const n = e.splitSections(t);
    return n && n[0];
  }, e.getMediaSections = function(t) {
    const n = e.splitSections(t);
    return n.shift(), n;
  }, e.matchPrefix = function(t, n) {
    return e.splitLines(t).filter((s) => s.indexOf(n) === 0);
  }, e.parseCandidate = function(t) {
    let n;
    t.indexOf("a=candidate:") === 0 ? n = t.substring(12).split(" ") : n = t.substring(10).split(" ");
    const s = {
      foundation: n[0],
      component: {
        1: "rtp",
        2: "rtcp"
      }[n[1]] || n[1],
      protocol: n[2].toLowerCase(),
      priority: parseInt(n[3], 10),
      ip: n[4],
      address: n[4],
      // address is an alias for ip.
      port: parseInt(n[5], 10),
      // skip parts[6] == 'typ'
      type: n[7]
    };
    for (let r = 8; r < n.length; r += 2)
      switch (n[r]) {
        case "raddr":
          s.relatedAddress = n[r + 1];
          break;
        case "rport":
          s.relatedPort = parseInt(n[r + 1], 10);
          break;
        case "tcptype":
          s.tcpType = n[r + 1];
          break;
        case "ufrag":
          s.ufrag = n[r + 1], s.usernameFragment = n[r + 1];
          break;
        default:
          s[n[r]] === void 0 && (s[n[r]] = n[r + 1]);
          break;
      }
    return s;
  }, e.writeCandidate = function(t) {
    const n = [];
    n.push(t.foundation);
    const s = t.component;
    s === "rtp" ? n.push(1) : s === "rtcp" ? n.push(2) : n.push(s), n.push(t.protocol.toUpperCase()), n.push(t.priority), n.push(t.address || t.ip), n.push(t.port);
    const r = t.type;
    return n.push("typ"), n.push(r), r !== "host" && t.relatedAddress && t.relatedPort && (n.push("raddr"), n.push(t.relatedAddress), n.push("rport"), n.push(t.relatedPort)), t.tcpType && t.protocol.toLowerCase() === "tcp" && (n.push("tcptype"), n.push(t.tcpType)), (t.usernameFragment || t.ufrag) && (n.push("ufrag"), n.push(t.usernameFragment || t.ufrag)), "candidate:" + n.join(" ");
  }, e.parseIceOptions = function(t) {
    return t.substring(14).split(" ");
  }, e.parseRtpMap = function(t) {
    let n = t.substring(9).split(" ");
    const s = {
      payloadType: parseInt(n.shift(), 10)
      // was: id
    };
    return n = n[0].split("/"), s.name = n[0], s.clockRate = parseInt(n[1], 10), s.channels = n.length === 3 ? parseInt(n[2], 10) : 1, s.numChannels = s.channels, s;
  }, e.writeRtpMap = function(t) {
    let n = t.payloadType;
    t.preferredPayloadType !== void 0 && (n = t.preferredPayloadType);
    const s = t.channels || t.numChannels || 1;
    return "a=rtpmap:" + n + " " + t.name + "/" + t.clockRate + (s !== 1 ? "/" + s : "") + `\r
`;
  }, e.parseExtmap = function(t) {
    const n = t.substring(9).split(" ");
    return {
      id: parseInt(n[0], 10),
      direction: n[0].indexOf("/") > 0 ? n[0].split("/")[1] : "sendrecv",
      uri: n[1],
      attributes: n.slice(2).join(" ")
    };
  }, e.writeExtmap = function(t) {
    return "a=extmap:" + (t.id || t.preferredId) + (t.direction && t.direction !== "sendrecv" ? "/" + t.direction : "") + " " + t.uri + (t.attributes ? " " + t.attributes : "") + `\r
`;
  }, e.parseFmtp = function(t) {
    const n = {};
    let s;
    const r = t.substring(t.indexOf(" ") + 1).split(";");
    for (let a = 0; a < r.length; a++)
      s = r[a].trim().split("="), n[s[0].trim()] = s[1];
    return n;
  }, e.writeFmtp = function(t) {
    let n = "", s = t.payloadType;
    if (t.preferredPayloadType !== void 0 && (s = t.preferredPayloadType), t.parameters && Object.keys(t.parameters).length) {
      const r = [];
      Object.keys(t.parameters).forEach((a) => {
        t.parameters[a] !== void 0 ? r.push(a + "=" + t.parameters[a]) : r.push(a);
      }), n += "a=fmtp:" + s + " " + r.join(";") + `\r
`;
    }
    return n;
  }, e.parseRtcpFb = function(t) {
    const n = t.substring(t.indexOf(" ") + 1).split(" ");
    return {
      type: n.shift(),
      parameter: n.join(" ")
    };
  }, e.writeRtcpFb = function(t) {
    let n = "", s = t.payloadType;
    return t.preferredPayloadType !== void 0 && (s = t.preferredPayloadType), t.rtcpFeedback && t.rtcpFeedback.length && t.rtcpFeedback.forEach((r) => {
      n += "a=rtcp-fb:" + s + " " + r.type + (r.parameter && r.parameter.length ? " " + r.parameter : "") + `\r
`;
    }), n;
  }, e.parseSsrcMedia = function(t) {
    const n = t.indexOf(" "), s = {
      ssrc: parseInt(t.substring(7, n), 10)
    }, r = t.indexOf(":", n);
    return r > -1 ? (s.attribute = t.substring(n + 1, r), s.value = t.substring(r + 1)) : s.attribute = t.substring(n + 1), s;
  }, e.parseSsrcGroup = function(t) {
    const n = t.substring(13).split(" ");
    return {
      semantics: n.shift(),
      ssrcs: n.map((s) => parseInt(s, 10))
    };
  }, e.getMid = function(t) {
    const n = e.matchPrefix(t, "a=mid:")[0];
    if (n)
      return n.substring(6);
  }, e.parseFingerprint = function(t) {
    const n = t.substring(14).split(" ");
    return {
      algorithm: n[0].toLowerCase(),
      // algorithm is case-sensitive in Edge.
      value: n[1].toUpperCase()
      // the definition is upper-case in RFC 4572.
    };
  }, e.getDtlsParameters = function(t, n) {
    return {
      role: "auto",
      fingerprints: e.matchPrefix(t + n, "a=fingerprint:").map(e.parseFingerprint)
    };
  }, e.writeDtlsParameters = function(t, n) {
    let s = "a=setup:" + n + `\r
`;
    return t.fingerprints.forEach((r) => {
      s += "a=fingerprint:" + r.algorithm + " " + r.value + `\r
`;
    }), s;
  }, e.parseCryptoLine = function(t) {
    const n = t.substring(9).split(" ");
    return {
      tag: parseInt(n[0], 10),
      cryptoSuite: n[1],
      keyParams: n[2],
      sessionParams: n.slice(3)
    };
  }, e.writeCryptoLine = function(t) {
    return "a=crypto:" + t.tag + " " + t.cryptoSuite + " " + (typeof t.keyParams == "object" ? e.writeCryptoKeyParams(t.keyParams) : t.keyParams) + (t.sessionParams ? " " + t.sessionParams.join(" ") : "") + `\r
`;
  }, e.parseCryptoKeyParams = function(t) {
    if (t.indexOf("inline:") !== 0)
      return null;
    const n = t.substring(7).split("|");
    return {
      keyMethod: "inline",
      keySalt: n[0],
      lifeTime: n[1],
      mkiValue: n[2] ? n[2].split(":")[0] : void 0,
      mkiLength: n[2] ? n[2].split(":")[1] : void 0
    };
  }, e.writeCryptoKeyParams = function(t) {
    return t.keyMethod + ":" + t.keySalt + (t.lifeTime ? "|" + t.lifeTime : "") + (t.mkiValue && t.mkiLength ? "|" + t.mkiValue + ":" + t.mkiLength : "");
  }, e.getCryptoParameters = function(t, n) {
    return e.matchPrefix(t + n, "a=crypto:").map(e.parseCryptoLine);
  }, e.getIceParameters = function(t, n) {
    const s = e.matchPrefix(t + n, "a=ice-ufrag:")[0], r = e.matchPrefix(t + n, "a=ice-pwd:")[0];
    return s && r ? {
      usernameFragment: s.substring(12),
      password: r.substring(10)
    } : null;
  }, e.writeIceParameters = function(t) {
    let n = "a=ice-ufrag:" + t.usernameFragment + `\r
a=ice-pwd:` + t.password + `\r
`;
    return t.iceLite && (n += `a=ice-lite\r
`), n;
  }, e.parseRtpParameters = function(t) {
    const n = {
      codecs: [],
      headerExtensions: [],
      fecMechanisms: [],
      rtcp: []
    }, r = e.splitLines(t)[0].split(" ");
    n.profile = r[2];
    for (let o = 3; o < r.length; o++) {
      const c = r[o], d = e.matchPrefix(t, "a=rtpmap:" + c + " ")[0];
      if (d) {
        const l = e.parseRtpMap(d), u = e.matchPrefix(t, "a=fmtp:" + c + " ");
        switch (l.parameters = u.length ? e.parseFmtp(u[0]) : {}, l.rtcpFeedback = e.matchPrefix(t, "a=rtcp-fb:" + c + " ").map(e.parseRtcpFb), n.codecs.push(l), l.name.toUpperCase()) {
          case "RED":
          case "ULPFEC":
            n.fecMechanisms.push(l.name.toUpperCase());
            break;
        }
      }
    }
    e.matchPrefix(t, "a=extmap:").forEach((o) => {
      n.headerExtensions.push(e.parseExtmap(o));
    });
    const a = e.matchPrefix(t, "a=rtcp-fb:* ").map(e.parseRtcpFb);
    return n.codecs.forEach((o) => {
      a.forEach((c) => {
        o.rtcpFeedback.find((l) => l.type === c.type && l.parameter === c.parameter) || o.rtcpFeedback.push(c);
      });
    }), n;
  }, e.writeRtpDescription = function(t, n) {
    let s = "";
    s += "m=" + t + " ", s += n.codecs.length > 0 ? "9" : "0", s += " " + (n.profile || "UDP/TLS/RTP/SAVPF") + " ", s += n.codecs.map((a) => a.preferredPayloadType !== void 0 ? a.preferredPayloadType : a.payloadType).join(" ") + `\r
`, s += `c=IN IP4 0.0.0.0\r
`, s += `a=rtcp:9 IN IP4 0.0.0.0\r
`, n.codecs.forEach((a) => {
      s += e.writeRtpMap(a), s += e.writeFmtp(a), s += e.writeRtcpFb(a);
    });
    let r = 0;
    return n.codecs.forEach((a) => {
      a.maxptime > r && (r = a.maxptime);
    }), r > 0 && (s += "a=maxptime:" + r + `\r
`), n.headerExtensions && n.headerExtensions.forEach((a) => {
      s += e.writeExtmap(a);
    }), s;
  }, e.parseRtpEncodingParameters = function(t) {
    const n = [], s = e.parseRtpParameters(t), r = s.fecMechanisms.indexOf("RED") !== -1, a = s.fecMechanisms.indexOf("ULPFEC") !== -1, o = e.matchPrefix(t, "a=ssrc:").map((p) => e.parseSsrcMedia(p)).filter((p) => p.attribute === "cname"), c = o.length > 0 && o[0].ssrc;
    let d;
    const l = e.matchPrefix(t, "a=ssrc-group:FID").map((p) => p.substring(17).split(" ").map((b) => parseInt(b, 10)));
    l.length > 0 && l[0].length > 1 && l[0][0] === c && (d = l[0][1]), s.codecs.forEach((p) => {
      if (p.name.toUpperCase() === "RTX" && p.parameters.apt) {
        let f = {
          ssrc: c,
          codecPayloadType: parseInt(p.parameters.apt, 10)
        };
        c && d && (f.rtx = {
          ssrc: d
        }), n.push(f), r && (f = JSON.parse(JSON.stringify(f)), f.fec = {
          ssrc: c,
          mechanism: a ? "red+ulpfec" : "red"
        }, n.push(f));
      }
    }), n.length === 0 && c && n.push({
      ssrc: c
    });
    let u = e.matchPrefix(t, "b=");
    return u.length && (u[0].indexOf("b=TIAS:") === 0 ? u = parseInt(u[0].substring(7), 10) : u[0].indexOf("b=AS:") === 0 ? u = parseInt(u[0].substring(5), 10) * 1e3 * 0.95 - 50 * 40 * 8 : u = void 0, n.forEach((p) => {
      p.maxBitrate = u;
    })), n;
  }, e.parseRtcpParameters = function(t) {
    const n = {}, s = e.matchPrefix(t, "a=ssrc:").map((o) => e.parseSsrcMedia(o)).filter((o) => o.attribute === "cname")[0];
    s && (n.cname = s.value, n.ssrc = s.ssrc);
    const r = e.matchPrefix(t, "a=rtcp-rsize");
    n.reducedSize = r.length > 0, n.compound = r.length === 0;
    const a = e.matchPrefix(t, "a=rtcp-mux");
    return n.mux = a.length > 0, n;
  }, e.writeRtcpParameters = function(t) {
    let n = "";
    return t.reducedSize && (n += `a=rtcp-rsize\r
`), t.mux && (n += `a=rtcp-mux\r
`), t.ssrc !== void 0 && t.cname && (n += "a=ssrc:" + t.ssrc + " cname:" + t.cname + `\r
`), n;
  }, e.parseMsid = function(t) {
    let n;
    const s = e.matchPrefix(t, "a=msid:");
    if (s.length === 1)
      return n = s[0].substring(7).split(" "), {
        stream: n[0],
        track: n[1]
      };
    const r = e.matchPrefix(t, "a=ssrc:").map((a) => e.parseSsrcMedia(a)).filter((a) => a.attribute === "msid");
    if (r.length > 0)
      return n = r[0].value.split(" "), {
        stream: n[0],
        track: n[1]
      };
  }, e.parseSctpDescription = function(t) {
    const n = e.parseMLine(t), s = e.matchPrefix(t, "a=max-message-size:");
    let r;
    s.length > 0 && (r = parseInt(s[0].substring(19), 10)), isNaN(r) && (r = 65536);
    const a = e.matchPrefix(t, "a=sctp-port:");
    if (a.length > 0)
      return {
        port: parseInt(a[0].substring(12), 10),
        protocol: n.fmt,
        maxMessageSize: r
      };
    const o = e.matchPrefix(t, "a=sctpmap:");
    if (o.length > 0) {
      const c = o[0].substring(10).split(" ");
      return {
        port: parseInt(c[0], 10),
        protocol: c[1],
        maxMessageSize: r
      };
    }
  }, e.writeSctpDescription = function(t, n) {
    let s = [];
    return t.protocol !== "DTLS/SCTP" ? s = ["m=" + t.kind + " 9 " + t.protocol + " " + n.protocol + `\r
`, `c=IN IP4 0.0.0.0\r
`, "a=sctp-port:" + n.port + `\r
`] : s = ["m=" + t.kind + " 9 " + t.protocol + " " + n.port + `\r
`, `c=IN IP4 0.0.0.0\r
`, "a=sctpmap:" + n.port + " " + n.protocol + ` 65535\r
`], n.maxMessageSize !== void 0 && s.push("a=max-message-size:" + n.maxMessageSize + `\r
`), s.join("");
  }, e.generateSessionId = function() {
    return Math.random().toString().substr(2, 22);
  }, e.writeSessionBoilerplate = function(t, n, s) {
    let r;
    const a = n !== void 0 ? n : 2;
    return t ? r = t : r = e.generateSessionId(), `v=0\r
o=` + (s || "thisisadapterortc") + " " + r + " " + a + ` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`;
  }, e.getDirection = function(t, n) {
    const s = e.splitLines(t);
    for (let r = 0; r < s.length; r++)
      switch (s[r]) {
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
          return s[r].substring(2);
      }
    return n ? e.getDirection(n) : "sendrecv";
  }, e.getKind = function(t) {
    return e.splitLines(t)[0].split(" ")[0].substring(2);
  }, e.isRejected = function(t) {
    return t.split(" ", 2)[1] === "0";
  }, e.parseMLine = function(t) {
    const s = e.splitLines(t)[0].substring(2).split(" ");
    return {
      kind: s[0],
      port: parseInt(s[1], 10),
      protocol: s[2],
      fmt: s.slice(3).join(" ")
    };
  }, e.parseOLine = function(t) {
    const s = e.matchPrefix(t, "o=")[0].substring(2).split(" ");
    return {
      username: s[0],
      sessionId: s[1],
      sessionVersion: parseInt(s[2], 10),
      netType: s[3],
      addressType: s[4],
      address: s[5]
    };
  }, e.isValidSDP = function(t) {
    if (typeof t != "string" || t.length === 0)
      return !1;
    const n = e.splitLines(t);
    for (let s = 0; s < n.length; s++)
      if (n[s].length < 2 || n[s].charAt(1) !== "=")
        return !1;
    return !0;
  }, i.exports = e;
})(gr);
var vr = gr.exports;
const Ge = /* @__PURE__ */ oo(vr), Io = /* @__PURE__ */ Br({
  __proto__: null,
  default: Ge
}, [vr]);
function _t(i) {
  if (!i.RTCIceCandidate || i.RTCIceCandidate && "foundation" in i.RTCIceCandidate.prototype)
    return;
  const e = i.RTCIceCandidate;
  i.RTCIceCandidate = function(n) {
    if (typeof n == "object" && n.candidate && n.candidate.indexOf("a=") === 0 && (n = JSON.parse(JSON.stringify(n)), n.candidate = n.candidate.substring(2)), n.candidate && n.candidate.length) {
      const s = new e(n), r = Ge.parseCandidate(n.candidate);
      for (const a in r)
        a in s || Object.defineProperty(s, a, {
          value: r[a]
        });
      return s.toJSON = function() {
        return {
          candidate: s.candidate,
          sdpMid: s.sdpMid,
          sdpMLineIndex: s.sdpMLineIndex,
          usernameFragment: s.usernameFragment
        };
      }, s;
    }
    return new e(n);
  }, i.RTCIceCandidate.prototype = e.prototype, _e(i, "icecandidate", (t) => (t.candidate && Object.defineProperty(t, "candidate", {
    value: new i.RTCIceCandidate(t.candidate),
    writable: "false"
  }), t));
}
function ki(i) {
  !i.RTCIceCandidate || i.RTCIceCandidate && "relayProtocol" in i.RTCIceCandidate.prototype || _e(i, "icecandidate", (e) => {
    if (e.candidate) {
      const t = Ge.parseCandidate(e.candidate.candidate);
      t.type === "relay" && (e.candidate.relayProtocol = {
        0: "tls",
        1: "tcp",
        2: "udp"
      }[t.priority >> 24]);
    }
    return e;
  });
}
function Lt(i, e) {
  if (!i.RTCPeerConnection)
    return;
  "sctp" in i.RTCPeerConnection.prototype || Object.defineProperty(i.RTCPeerConnection.prototype, "sctp", {
    get() {
      return typeof this._sctp == "undefined" ? null : this._sctp;
    }
  });
  const t = function(o) {
    if (!o || !o.sdp)
      return !1;
    const c = Ge.splitSections(o.sdp);
    return c.shift(), c.some((d) => {
      const l = Ge.parseMLine(d);
      return l && l.kind === "application" && l.protocol.indexOf("SCTP") !== -1;
    });
  }, n = function(o) {
    const c = o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
    if (c === null || c.length < 2)
      return -1;
    const d = parseInt(c[1], 10);
    return d !== d ? -1 : d;
  }, s = function(o) {
    let c = 65536;
    return e.browser === "firefox" && (e.version < 57 ? o === -1 ? c = 16384 : c = 2147483637 : e.version < 60 ? c = e.version === 57 ? 65535 : 65536 : c = 2147483637), c;
  }, r = function(o, c) {
    let d = 65536;
    e.browser === "firefox" && e.version === 57 && (d = 65535);
    const l = Ge.matchPrefix(o.sdp, "a=max-message-size:");
    return l.length > 0 ? d = parseInt(l[0].substring(19), 10) : e.browser === "firefox" && c !== -1 && (d = 2147483637), d;
  }, a = i.RTCPeerConnection.prototype.setRemoteDescription;
  i.RTCPeerConnection.prototype.setRemoteDescription = function() {
    if (this._sctp = null, e.browser === "chrome" && e.version >= 76) {
      const {
        sdpSemantics: c
      } = this.getConfiguration();
      c === "plan-b" && Object.defineProperty(this, "sctp", {
        get() {
          return typeof this._sctp == "undefined" ? null : this._sctp;
        },
        enumerable: !0,
        configurable: !0
      });
    }
    if (t(arguments[0])) {
      const c = n(arguments[0]), d = s(c), l = r(arguments[0], c);
      let u;
      d === 0 && l === 0 ? u = Number.POSITIVE_INFINITY : d === 0 || l === 0 ? u = Math.max(d, l) : u = Math.min(d, l);
      const p = {};
      Object.defineProperty(p, "maxMessageSize", {
        get() {
          return u;
        }
      }), this._sctp = p;
    }
    return a.apply(this, arguments);
  };
}
function At(i) {
  if (!(i.RTCPeerConnection && "createDataChannel" in i.RTCPeerConnection.prototype))
    return;
  function e(n, s) {
    const r = n.send;
    n.send = function() {
      const o = arguments[0], c = o.length || o.size || o.byteLength;
      if (n.readyState === "open" && s.sctp && c > s.sctp.maxMessageSize)
        throw new TypeError("Message too large (can send a maximum of " + s.sctp.maxMessageSize + " bytes)");
      return r.apply(n, arguments);
    };
  }
  const t = i.RTCPeerConnection.prototype.createDataChannel;
  i.RTCPeerConnection.prototype.createDataChannel = function() {
    const s = t.apply(this, arguments);
    return e(s, this), s;
  }, _e(i, "datachannel", (n) => (e(n.channel, n.target), n));
}
function yi(i) {
  if (!i.RTCPeerConnection || "connectionState" in i.RTCPeerConnection.prototype)
    return;
  const e = i.RTCPeerConnection.prototype;
  Object.defineProperty(e, "connectionState", {
    get() {
      return {
        completed: "connected",
        checking: "connecting"
      }[this.iceConnectionState] || this.iceConnectionState;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "onconnectionstatechange", {
    get() {
      return this._onconnectionstatechange || null;
    },
    set(t) {
      this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), t && this.addEventListener("connectionstatechange", this._onconnectionstatechange = t);
    },
    enumerable: !0,
    configurable: !0
  }), ["setLocalDescription", "setRemoteDescription"].forEach((t) => {
    const n = e[t];
    e[t] = function() {
      return this._connectionstatechangepoly || (this._connectionstatechangepoly = (s) => {
        const r = s.target;
        if (r._lastConnectionState !== r.connectionState) {
          r._lastConnectionState = r.connectionState;
          const a = new Event("connectionstatechange", s);
          r.dispatchEvent(a);
        }
        return s;
      }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments);
    };
  });
}
function Ti(i, e) {
  if (!i.RTCPeerConnection || e.browser === "chrome" && e.version >= 71 || e.browser === "safari" && e.version >= 605)
    return;
  const t = i.RTCPeerConnection.prototype.setRemoteDescription;
  i.RTCPeerConnection.prototype.setRemoteDescription = function(s) {
    if (s && s.sdp && s.sdp.indexOf(`
a=extmap-allow-mixed`) !== -1) {
      const r = s.sdp.split(`
`).filter((a) => a.trim() !== "a=extmap-allow-mixed").join(`
`);
      i.RTCSessionDescription && s instanceof i.RTCSessionDescription ? arguments[0] = new i.RTCSessionDescription({
        type: s.type,
        sdp: r
      }) : s.sdp = r;
    }
    return t.apply(this, arguments);
  };
}
function Nt(i, e) {
  if (!(i.RTCPeerConnection && i.RTCPeerConnection.prototype))
    return;
  const t = i.RTCPeerConnection.prototype.addIceCandidate;
  !t || t.length === 0 || (i.RTCPeerConnection.prototype.addIceCandidate = function() {
    return arguments[0] ? (e.browser === "chrome" && e.version < 78 || e.browser === "firefox" && e.version < 68 || e.browser === "safari") && arguments[0] && arguments[0].candidate === "" ? Promise.resolve() : t.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
  });
}
function Ot(i, e) {
  if (!(i.RTCPeerConnection && i.RTCPeerConnection.prototype))
    return;
  const t = i.RTCPeerConnection.prototype.setLocalDescription;
  !t || t.length === 0 || (i.RTCPeerConnection.prototype.setLocalDescription = function() {
    let s = arguments[0] || {};
    if (typeof s != "object" || s.type && s.sdp)
      return t.apply(this, arguments);
    if (s = {
      type: s.type,
      sdp: s.sdp
    }, !s.type)
      switch (this.signalingState) {
        case "stable":
        case "have-local-offer":
        case "have-remote-pranswer":
          s.type = "offer";
          break;
        default:
          s.type = "answer";
          break;
      }
    return s.sdp || s.type !== "offer" && s.type !== "answer" ? t.apply(this, [s]) : (s.type === "offer" ? this.createOffer : this.createAnswer).apply(this).then((a) => t.apply(this, [a]));
  });
}
const xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  removeExtmapAllowMixed: Ti,
  shimAddIceCandidateNullOrEmpty: Nt,
  shimConnectionState: yi,
  shimMaxMessageSize: Lt,
  shimParameterlessSetLocalDescription: Ot,
  shimRTCIceCandidate: _t,
  shimRTCIceCandidateRelayProtocol: ki,
  shimSendThrowTypeError: At
}, Symbol.toStringTag, { value: "Module" }));
function Mo() {
  let {
    window: i
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    shimChrome: !0,
    shimFirefox: !0,
    shimSafari: !0
  };
  const t = Vs, n = wo(i), s = {
    browserDetails: n,
    commonShim: xo,
    extractVersion: Dt,
    disableLog: Co,
    disableWarnings: Po,
    // Expose sdp as a convenience. For production apps include directly.
    sdp: Io
  };
  switch (n.browser) {
    case "chrome":
      if (!Sn || !vi || !e.shimChrome)
        return t("Chrome shim is not included in this adapter release."), s;
      if (n.version === null)
        return t("Chrome shim can not determine version, not shimming."), s;
      t("adapter.js shimming chrome."), s.browserShim = Sn, Nt(i, n), Ot(i), Ks(i, n), js(i), vi(i, n), Gs(i), Qs(i, n), Hs(i), zs(i), Ws(i), $s(i, n), _t(i), ki(i), yi(i), Lt(i, n), At(i), Ti(i, n);
      break;
    case "firefox":
      if (!Cn || !bi || !e.shimFirefox)
        return t("Firefox shim is not included in this adapter release."), s;
      t("adapter.js shimming firefox."), s.browserShim = Cn, Nt(i, n), Ot(i), Ys(i, n), bi(i, n), Xs(i), tr(i), Zs(i), er(i), ir(i), nr(i), sr(i), rr(i), ar(i), _t(i), yi(i), Lt(i, n), At(i);
      break;
    case "safari":
      if (!Pn || !e.shimSafari)
        return t("Safari shim is not included in this adapter release."), s;
      t("adapter.js shimming safari."), s.browserShim = Pn, Nt(i, n), Ot(i), hr(i), fr(i), dr(i), or(i), cr(i), pr(i), lr(i), mr(i), _t(i), ki(i), Lt(i, n), At(i), Ti(i, n);
      break;
    default:
      t("Unsupported browser!");
      break;
  }
  return s;
}
Mo({
  window: typeof window == "undefined" ? void 0 : window
});
const Do = 10, Ct = "lk_e2ee", _o = "LKFrameEncryptionKey", Lo = {
  sharedKey: !1,
  ratchetSalt: _o,
  ratchetWindowSize: 8,
  failureTolerance: Do,
  keyringSize: 16
};
var xe = /* @__PURE__ */ ((i) => (i.SetKey = "setKey", i.RatchetRequest = "ratchetRequest", i.KeyRatcheted = "keyRatcheted", i))(xe || {}), Ee = /* @__PURE__ */ ((i) => (i.ParticipantEncryptionStatusChanged = "participantEncryptionStatusChanged", i.EncryptionError = "encryptionError", i))(Ee || {});
function Ao() {
  return No() || Si();
}
function Si() {
  return typeof window.RTCRtpScriptTransform != "undefined";
}
function No() {
  return typeof window.RTCRtpSender != "undefined" && // @ts-ignore
  typeof window.RTCRtpSender.prototype.createEncodedStreams != "undefined";
}
async function Oo(i) {
  let e = new TextEncoder();
  return await crypto.subtle.importKey("raw", e.encode(i), {
    name: "PBKDF2"
  }, !1, ["deriveBits", "deriveKey"]);
}
async function Uo(i) {
  return await crypto.subtle.importKey("raw", i, "HKDF", !1, ["deriveBits", "deriveKey"]);
}
class Fo extends Pe.EventEmitter {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    super(), this.onKeyRatcheted = (t, n) => {
      I.debug("key ratcheted event received", {
        material: t,
        keyIndex: n
      });
    }, this.keyInfoMap = /* @__PURE__ */ new Map(), this.options = h(h({}, Lo), e), this.on(xe.KeyRatcheted, this.onKeyRatcheted);
  }
  /**
   * callback to invoke once a key has been set for a participant
   * @param key
   * @param participantIdentity
   * @param keyIndex
   */
  onSetEncryptionKey(e, t, n) {
    const s = {
      key: e,
      participantIdentity: t,
      keyIndex: n
    };
    if (!this.options.sharedKey && !t)
      throw new Error("participant identity needs to be passed for encryption key if sharedKey option is false");
    this.keyInfoMap.set("".concat(t != null ? t : "shared", "-").concat(n != null ? n : 0), s), this.emit(xe.SetKey, s);
  }
  getKeys() {
    return Array.from(this.keyInfoMap.values());
  }
  getOptions() {
    return this.options;
  }
  ratchetKey(e, t) {
    this.emit(xe.RatchetRequest, e, t);
  }
}
class Bo extends Fo {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const t = h(h({}, e), {}, {
      sharedKey: !0,
      // for a shared key provider failing to decrypt for a specific participant
      // should not mark the key as invalid, so we accept wrong keys forever
      // and won't try to auto-ratchet
      ratchetWindowSize: 0,
      failureTolerance: -1
    });
    super(t);
  }
  /**
   * Accepts a passphrase that's used to create the crypto keys.
   * When passing in a string, PBKDF2 is used.
   * When passing in an Array buffer of cryptographically random numbers, HKDF is being used. (recommended)
   * @param key
   */
  async setKey(e) {
    const t = typeof e == "string" ? await Oo(e) : await Uo(e);
    this.onSetEncryptionKey(t);
  }
}
class Ye extends Error {
  constructor(e, t) {
    super(t || "an error has occured"), this.code = e;
  }
}
var J = /* @__PURE__ */ ((i) => (i[i.NotAllowed = 0] = "NotAllowed", i[i.ServerUnreachable = 1] = "ServerUnreachable", i[i.InternalError = 2] = "InternalError", i[i.Cancelled = 3] = "Cancelled", i[i.LeaveRequest = 4] = "LeaveRequest", i))(J || {});
class L extends Ye {
  constructor(e, t, n) {
    super(1, e), this.status = n, this.reason = t;
  }
}
class ji extends Ye {
  constructor(e) {
    super(21, e != null ? e : "device is unsupported");
  }
}
class ce extends Ye {
  constructor(e) {
    super(20, e != null ? e : "track is invalid");
  }
}
class Vo extends Ye {
  constructor(e) {
    super(10, e != null ? e : "unsupported server");
  }
}
class K extends Ye {
  constructor(e) {
    super(12, e != null ? e : "unexpected connection state");
  }
}
class Ci extends Ye {
  constructor(e) {
    super(13, e != null ? e : "unable to negotiate");
  }
}
var qt = /* @__PURE__ */ ((i) => (i.PermissionDenied = "PermissionDenied", i.NotFound = "NotFound", i.DeviceInUse = "DeviceInUse", i.Other = "Other", i))(qt || {});
((i) => {
  function e(t) {
    if (t && "name" in t)
      return t.name === "NotFoundError" || t.name === "DevicesNotFoundError" ? "NotFound" : t.name === "NotAllowedError" || t.name === "PermissionDeniedError" ? "PermissionDenied" : t.name === "NotReadableError" || t.name === "TrackStartError" ? "DeviceInUse" : "Other";
  }
  i.getFailure = e;
})(qt || (qt = {}));
var k = /* @__PURE__ */ ((i) => (i.Connected = "connected", i.Reconnecting = "reconnecting", i.Reconnected = "reconnected", i.Disconnected = "disconnected", i.ConnectionStateChanged = "connectionStateChanged", i.MediaDevicesChanged = "mediaDevicesChanged", i.ParticipantConnected = "participantConnected", i.ParticipantDisconnected = "participantDisconnected", i.TrackPublished = "trackPublished", i.TrackSubscribed = "trackSubscribed", i.TrackSubscriptionFailed = "trackSubscriptionFailed", i.TrackUnpublished = "trackUnpublished", i.TrackUnsubscribed = "trackUnsubscribed", i.TrackMuted = "trackMuted", i.TrackUnmuted = "trackUnmuted", i.LocalTrackPublished = "localTrackPublished", i.LocalTrackUnpublished = "localTrackUnpublished", i.LocalAudioSilenceDetected = "localAudioSilenceDetected", i.ActiveSpeakersChanged = "activeSpeakersChanged", i.ParticipantMetadataChanged = "participantMetadataChanged", i.ParticipantNameChanged = "participantNameChanged", i.RoomMetadataChanged = "roomMetadataChanged", i.DataReceived = "dataReceived", i.ConnectionQualityChanged = "connectionQualityChanged", i.TrackStreamStateChanged = "trackStreamStateChanged", i.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", i.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", i.AudioPlaybackStatusChanged = "audioPlaybackChanged", i.VideoPlaybackStatusChanged = "videoPlaybackChanged", i.MediaDevicesError = "mediaDevicesError", i.ParticipantPermissionsChanged = "participantPermissionsChanged", i.SignalConnected = "signalConnected", i.RecordingStatusChanged = "recordingStatusChanged", i.ParticipantEncryptionStatusChanged = "participantEncryptionStatusChanged", i.EncryptionError = "encryptionError", i.DCBufferStatusChanged = "dcBufferStatusChanged", i.ActiveDeviceChanged = "activeDeviceChanged", i))(k || {}), C = /* @__PURE__ */ ((i) => (i.TrackPublished = "trackPublished", i.TrackSubscribed = "trackSubscribed", i.TrackSubscriptionFailed = "trackSubscriptionFailed", i.TrackUnpublished = "trackUnpublished", i.TrackUnsubscribed = "trackUnsubscribed", i.TrackMuted = "trackMuted", i.TrackUnmuted = "trackUnmuted", i.LocalTrackPublished = "localTrackPublished", i.LocalTrackUnpublished = "localTrackUnpublished", i.ParticipantMetadataChanged = "participantMetadataChanged", i.ParticipantNameChanged = "participantNameChanged", i.DataReceived = "dataReceived", i.IsSpeakingChanged = "isSpeakingChanged", i.ConnectionQualityChanged = "connectionQualityChanged", i.TrackStreamStateChanged = "trackStreamStateChanged", i.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", i.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", i.MediaDevicesError = "mediaDevicesError", i.AudioStreamAcquired = "audioStreamAcquired", i.ParticipantPermissionsChanged = "participantPermissionsChanged", i.PCTrackAdded = "pcTrackAdded", i))(C || {}), P = /* @__PURE__ */ ((i) => (i.TransportsCreated = "transportsCreated", i.Connected = "connected", i.Disconnected = "disconnected", i.Resuming = "resuming", i.Resumed = "resumed", i.Restarting = "restarting", i.Restarted = "restarted", i.SignalResumed = "signalResumed", i.SignalRestarted = "signalRestarted", i.Closing = "closing", i.MediaTrackAdded = "mediaTrackAdded", i.ActiveSpeakersUpdate = "activeSpeakersUpdate", i.DataPacketReceived = "dataPacketReceived", i.RTPVideoMapUpdate = "rtpVideoMapUpdate", i.DCBufferStatusChanged = "dcBufferStatusChanged", i.ParticipantUpdate = "participantUpdate", i.RoomUpdate = "roomUpdate", i.SpeakersChanged = "speakersChanged", i.StreamStateChanged = "streamStateChanged", i.ConnectionQualityUpdate = "connectionQualityUpdate", i.SubscriptionError = "subscriptionError", i.SubscriptionPermissionUpdate = "subscriptionPermissionUpdate", i.RemoteMute = "remoteMute", i.SubscribedQualityUpdate = "subscribedQualityUpdate", i.LocalTrackUnpublished = "localTrackUnpublished", i.Offline = "offline", i))(P || {}), T = /* @__PURE__ */ ((i) => (i.Message = "message", i.Muted = "muted", i.Unmuted = "unmuted", i.Restarted = "restarted", i.Ended = "ended", i.Subscribed = "subscribed", i.Unsubscribed = "unsubscribed", i.UpdateSettings = "updateSettings", i.UpdateSubscription = "updateSubscription", i.AudioPlaybackStarted = "audioPlaybackStarted", i.AudioPlaybackFailed = "audioPlaybackFailed", i.AudioSilenceDetected = "audioSilenceDetected", i.VisibilityChanged = "visibilityChanged", i.VideoDimensionsChanged = "videoDimensionsChanged", i.VideoPlaybackStarted = "videoPlaybackStarted", i.VideoPlaybackFailed = "videoPlaybackFailed", i.ElementAttached = "elementAttached", i.ElementDetached = "elementDetached", i.UpstreamPaused = "upstreamPaused", i.UpstreamResumed = "upstreamResumed", i.SubscriptionPermissionChanged = "subscriptionPermissionChanged", i.SubscriptionStatusChanged = "subscriptionStatusChanged", i.SubscriptionFailed = "subscriptionFailed", i.TrackProcessorUpdate = "trackProcessorUpdate", i.AudioTrackFeatureUpdate = "audioTrackFeatureUpdate", i))(T || {});
function Gi(i, e, t) {
  var n, s, r;
  e === void 0 && (e = 50), t === void 0 && (t = {});
  var a = (n = t.isImmediate) != null && n, o = (s = t.callback) != null && s, c = t.maxWait, d = Date.now(), l = [];
  function u() {
    if (c !== void 0) {
      var f = Date.now() - d;
      if (f + e >= c)
        return c - f;
    }
    return e;
  }
  var p = function() {
    var f = [].slice.call(arguments), b = this;
    return new Promise(function(y, w) {
      var S = a && r === void 0;
      if (r !== void 0 && clearTimeout(r), r = setTimeout(function() {
        if (r = void 0, d = Date.now(), !a) {
          var U = i.apply(b, f);
          o && o(U), l.forEach(function(V) {
            return (0, V.resolve)(U);
          }), l = [];
        }
      }, u()), S) {
        var N = i.apply(b, f);
        return o && o(N), y(N);
      }
      l.push({
        resolve: y,
        reject: w
      });
    });
  };
  return p.cancel = function(f) {
    r !== void 0 && clearTimeout(r), l.forEach(function(b) {
      return (0, b.reject)(f);
    }), l = [];
  }, p;
}
const qo = /version\/(\d+(\.?_?\d+)+)/i;
let ei;
function be(i) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (typeof i == "undefined" && typeof navigator == "undefined")
    return;
  const t = (i != null ? i : navigator.userAgent).toLowerCase();
  if (ei === void 0 || e) {
    const n = Ko.find((s) => {
      let {
        test: r
      } = s;
      return r.test(t);
    });
    ei = n == null ? void 0 : n.describe(t);
  }
  return ei;
}
const Ko = [
  {
    test: /firefox|iceweasel|fxios/i,
    describe(i) {
      return {
        name: "Firefox",
        version: Ut(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, i),
        os: i.toLowerCase().includes("fxios") ? "iOS" : void 0,
        osVersion: ti(i)
      };
    }
  },
  {
    test: /chrom|crios|crmo/i,
    describe(i) {
      return {
        name: "Chrome",
        version: Ut(/(?:chrome|chromium|crios|crmo)\/(\d+(\.?_?\d+)+)/i, i),
        os: i.toLowerCase().includes("crios") ? "iOS" : void 0,
        osVersion: ti(i)
      };
    }
  },
  /* Safari */
  {
    test: /safari|applewebkit/i,
    describe(i) {
      return {
        name: "Safari",
        version: Ut(qo, i),
        os: i.includes("mobile/") ? "iOS" : "macOS",
        osVersion: ti(i)
      };
    }
  }
];
function Ut(i, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  const n = e.match(i);
  return n && n.length >= t && n[t] || "";
}
function ti(i) {
  return i.includes("mac os") ? Ut(/\(.+?(\d+_\d+(:?_\d+)?)/, i, 1).replace(/_/g, ".") : void 0;
}
const jo = "2.1.1", Go = jo, Ho = 12;
var yt;
class Y {
}
yt = Y;
yt.setTimeout = function() {
  return setTimeout(...arguments);
};
yt.setInterval = function() {
  return setInterval(...arguments);
};
yt.clearTimeout = function() {
  return clearTimeout(...arguments);
};
yt.clearInterval = function() {
  return clearInterval(...arguments);
};
class x {
  constructor(e, t, n, s, r) {
    if (typeof e == "object")
      this.width = e.width, this.height = e.height, this.aspectRatio = e.aspectRatio, this.encoding = {
        maxBitrate: e.maxBitrate,
        maxFramerate: e.maxFramerate,
        priority: e.priority
      };
    else if (t !== void 0 && n !== void 0)
      this.width = e, this.height = t, this.aspectRatio = e / t, this.encoding = {
        maxBitrate: n,
        maxFramerate: s,
        priority: r
      };
    else
      throw new TypeError("Unsupported options: provide at least width, height and maxBitrate");
  }
  get resolution() {
    return {
      width: this.width,
      height: this.height,
      frameRate: this.encoding.maxFramerate,
      aspectRatio: this.aspectRatio
    };
  }
}
const zo = ["vp8", "h264"], br = ["vp8", "h264", "vp9", "av1"];
function Wo(i) {
  return !!zo.find((e) => e === i);
}
var Pi;
((i) => {
  i.telephone = {
    maxBitrate: 12e3
  }, i.speech = {
    maxBitrate: 2e4
  }, i.music = {
    maxBitrate: 32e3
  }, i.musicStereo = {
    maxBitrate: 48e3
  }, i.musicHighQuality = {
    maxBitrate: 64e3
  }, i.musicHighQualityStereo = {
    maxBitrate: 96e3
  };
})(Pi || (Pi = {}));
const me = {
  h90: new x(160, 90, 9e4, 20),
  h180: new x(320, 180, 16e4, 20),
  h216: new x(384, 216, 18e4, 20),
  h360: new x(640, 360, 45e4, 20),
  h540: new x(960, 540, 8e5, 25),
  h720: new x(1280, 720, 17e5, 30),
  h1080: new x(1920, 1080, 3e6, 30),
  h1440: new x(2560, 1440, 5e6, 30),
  h2160: new x(3840, 2160, 8e6, 30)
}, wi = {
  h120: new x(160, 120, 7e4, 20),
  h180: new x(240, 180, 125e3, 20),
  h240: new x(320, 240, 14e4, 20),
  h360: new x(480, 360, 33e4, 20),
  h480: new x(640, 480, 5e5, 20),
  h540: new x(720, 540, 6e5, 25),
  h720: new x(960, 720, 13e5, 30),
  h1080: new x(1440, 1080, 23e5, 30),
  h1440: new x(1920, 1440, 38e5, 30)
}, Jt = {
  h360fps3: new x(640, 360, 2e5, 3, "medium"),
  h360fps15: new x(640, 360, 4e5, 15, "medium"),
  h720fps5: new x(1280, 720, 8e5, 5, "medium"),
  h720fps15: new x(1280, 720, 15e5, 15, "medium"),
  h720fps30: new x(1280, 720, 2e6, 30, "medium"),
  h1080fps15: new x(1920, 1080, 25e5, 15, "medium"),
  h1080fps30: new x(1920, 1080, 5e6, 30, "medium"),
  // original resolution, without resizing
  original: new x(0, 0, 7e6, 30, "medium")
};
function Jo(i) {
  if (typeof i != "undefined")
    return typeof structuredClone == "function" ? structuredClone(i) : JSON.parse(JSON.stringify(i));
}
const Qo = 5e3, it = [];
var Q = ((i) => (i[i.LOW = Ke.LOW] = "LOW", i[i.MEDIUM = Ke.MEDIUM] = "MEDIUM", i[i.HIGH = Ke.HIGH] = "HIGH", i))(Q || {});
class v extends Pe.EventEmitter {
  constructor(e, t) {
    var n;
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    super(), this.attachedElements = [], this.isMuted = !1, this.streamState = v.StreamState.Active, this.isInBackground = !1, this._currentBitrate = 0, this.log = I, this.appVisibilityChangedListener = () => {
      this.backgroundTimeout && clearTimeout(this.backgroundTimeout), document.visibilityState === "hidden" ? this.backgroundTimeout = setTimeout(() => this.handleAppVisibilityChanged(), Qo) : this.handleAppVisibilityChanged();
    }, this.log = ve((n = s.loggerName) !== null && n !== void 0 ? n : de.Track), this.loggerContextCb = s.loggerContextCb, this.setMaxListeners(100), this.kind = t, this._mediaStreamTrack = e, this._mediaStreamID = e.id, this.source = v.Source.Unknown;
  }
  get logContext() {
    var e;
    return h(h({}, (e = this.loggerContextCb) === null || e === void 0 ? void 0 : e.call(this)), _(this));
  }
  /** current receive bits per second */
  get currentBitrate() {
    return this._currentBitrate;
  }
  get mediaStreamTrack() {
    return this._mediaStreamTrack;
  }
  /**
   * @internal
   * used for keep mediaStream's first id, since it's id might change
   * if we disable/enable a track
   */
  get mediaStreamID() {
    return this._mediaStreamID;
  }
  attach(e) {
    let t = "audio";
    this.kind === v.Kind.Video && (t = "video"), this.attachedElements.length === 0 && v.Kind.Video && this.addAppVisibilityListener(), e || (t === "audio" && (it.forEach((r) => {
      r.parentElement === null && !e && (e = r);
    }), e && it.splice(it.indexOf(e), 1)), e || (e = document.createElement(t))), this.attachedElements.includes(e) || this.attachedElements.push(e), Ve(this.mediaStreamTrack, e);
    const n = e.srcObject.getTracks(), s = n.some((r) => r.kind === "audio");
    return e.play().then(() => {
      this.emit(s ? T.AudioPlaybackStarted : T.VideoPlaybackStarted);
    }).catch((r) => {
      r.name === "NotAllowedError" ? this.emit(s ? T.AudioPlaybackFailed : T.VideoPlaybackFailed, r) : r.name === "AbortError" ? I.debug("".concat(s ? "audio" : "video", " playback aborted, likely due to new play request")) : I.warn("could not playback ".concat(s ? "audio" : "video"), r), s && e && n.some((a) => a.kind === "video") && r.name === "NotAllowedError" && (e.muted = !0, e.play().catch(() => {
      }));
    }), this.emit(T.ElementAttached, e), e;
  }
  detach(e) {
    try {
      if (e) {
        He(this.mediaStreamTrack, e);
        const n = this.attachedElements.indexOf(e);
        return n >= 0 && (this.attachedElements.splice(n, 1), this.recycleElement(e), this.emit(T.ElementDetached, e)), e;
      }
      const t = [];
      return this.attachedElements.forEach((n) => {
        He(this.mediaStreamTrack, n), t.push(n), this.recycleElement(n), this.emit(T.ElementDetached, n);
      }), this.attachedElements = [], t;
    } finally {
      this.attachedElements.length === 0 && this.removeAppVisibilityListener();
    }
  }
  stop() {
    this.stopMonitor(), this._mediaStreamTrack.stop();
  }
  enable() {
    this._mediaStreamTrack.enabled = !0;
  }
  disable() {
    this._mediaStreamTrack.enabled = !1;
  }
  /* @internal */
  stopMonitor() {
    this.monitorInterval && clearInterval(this.monitorInterval);
  }
  /** @internal */
  updateLoggerOptions(e) {
    e.loggerName && (this.log = ve(e.loggerName)), e.loggerContextCb && (this.loggerContextCb = e.loggerContextCb);
  }
  recycleElement(e) {
    if (e instanceof HTMLAudioElement) {
      let t = !0;
      e.pause(), it.forEach((n) => {
        n.parentElement || (t = !1);
      }), t && it.push(e);
    }
  }
  async handleAppVisibilityChanged() {
    this.isInBackground = document.visibilityState === "hidden", !this.isInBackground && this.kind === v.Kind.Video && setTimeout(() => this.attachedElements.forEach((e) => e.play().catch(() => {
    })), 0);
  }
  addAppVisibilityListener() {
    ee() ? (this.isInBackground = document.visibilityState === "hidden", document.addEventListener("visibilitychange", this.appVisibilityChangedListener)) : this.isInBackground = !1;
  }
  removeAppVisibilityListener() {
    ee() && document.removeEventListener("visibilitychange", this.appVisibilityChangedListener);
  }
}
function Ve(i, e) {
  let t;
  e.srcObject instanceof MediaStream ? t = e.srcObject : t = new MediaStream();
  let n;
  i.kind === "audio" ? n = t.getAudioTracks() : n = t.getVideoTracks(), n.includes(i) || (n.forEach((s) => {
    t.removeTrack(s);
  }), t.addTrack(i)), (!De() || !(e instanceof HTMLVideoElement)) && (e.autoplay = !0), e.muted = t.getAudioTracks().length === 0, e instanceof HTMLVideoElement && (e.playsInline = !0), e.srcObject !== t && (e.srcObject = t, (De() || Qe()) && e instanceof HTMLVideoElement && setTimeout(() => {
    e.srcObject = t, e.play().catch(() => {
    });
  }, 0));
}
function He(i, e) {
  if (e.srcObject instanceof MediaStream) {
    const t = e.srcObject;
    t.removeTrack(i), t.getTracks().length > 0 ? e.srcObject = t : e.srcObject = null;
  }
}
((i) => {
  ((a) => {
    a.Audio = "audio", a.Video = "video", a.Unknown = "unknown";
  })(i.Kind || (i.Kind = {})), ((a) => {
    a.Camera = "camera", a.Microphone = "microphone", a.ScreenShare = "screen_share", a.ScreenShareAudio = "screen_share_audio", a.Unknown = "unknown";
  })(i.Source || (i.Source = {})), ((a) => {
    a.Active = "active", a.Paused = "paused", a.Unknown = "unknown";
  })(i.StreamState || (i.StreamState = {}));
  function e(a) {
    switch (a) {
      case "audio":
        return re.AUDIO;
      case "video":
        return re.VIDEO;
      default:
        return re.DATA;
    }
  }
  i.kindToProto = e;
  function t(a) {
    switch (a) {
      case re.AUDIO:
        return "audio";
      case re.VIDEO:
        return "video";
      default:
        return "unknown";
    }
  }
  i.kindFromProto = t;
  function n(a) {
    switch (a) {
      case "camera":
        return H.CAMERA;
      case "microphone":
        return H.MICROPHONE;
      case "screen_share":
        return H.SCREEN_SHARE;
      case "screen_share_audio":
        return H.SCREEN_SHARE_AUDIO;
      default:
        return H.UNKNOWN;
    }
  }
  i.sourceToProto = n;
  function s(a) {
    switch (a) {
      case H.CAMERA:
        return "camera";
      case H.MICROPHONE:
        return "microphone";
      case H.SCREEN_SHARE:
        return "screen_share";
      case H.SCREEN_SHARE_AUDIO:
        return "screen_share_audio";
      default:
        return "unknown";
    }
  }
  i.sourceFromProto = s;
  function r(a) {
    switch (a) {
      case pi.ACTIVE:
        return "active";
      case pi.PAUSED:
        return "paused";
      default:
        return "unknown";
    }
  }
  i.streamStateFromProto = r;
})(v || (v = {}));
function $o(i, e, t) {
  var n;
  const s = (n = Jo(i)) !== null && n !== void 0 ? n : {};
  return s.audio === !0 && (s.audio = {}), s.video === !0 && (s.video = {}), s.audio && Ei(s.audio, e), s.video && Ei(s.video, t), s;
}
function Ei(i, e) {
  return Object.keys(e).forEach((t) => {
    i[t] === void 0 && (i[t] = e[t]);
  }), i;
}
function Hi(i) {
  const e = {};
  if (i.video)
    if (typeof i.video == "object") {
      const t = {}, n = t, s = i.video;
      Object.keys(s).forEach((r) => {
        switch (r) {
          case "resolution":
            Ei(n, s.resolution);
            break;
          default:
            n[r] = s[r];
        }
      }), e.video = t;
    } else
      e.video = i.video;
  else
    e.video = !1;
  return i.audio ? typeof i.audio == "object" ? e.audio = i.audio : e.audio = !0 : e.audio = !1, e;
}
async function Yo(i) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 200;
  const t = zi();
  if (t) {
    const n = t.createAnalyser();
    n.fftSize = 2048;
    const s = n.frequencyBinCount, r = new Uint8Array(s);
    t.createMediaStreamSource(new MediaStream([i.mediaStreamTrack])).connect(n), await ge(e), n.getByteTimeDomainData(r);
    const o = r.some((c) => c !== 128 && c !== 0);
    return t.close(), !o;
  }
  return !1;
}
function zi() {
  const i = (
    // @ts-ignore
    typeof window != "undefined" && (window.AudioContext || window.webkitAudioContext)
  );
  if (i)
    return new i({
      latencyHint: "interactive"
    });
}
function Xo(i) {
  return i === v.Source.Microphone ? "audioinput" : i === v.Source.Camera ? "videoinput" : void 0;
}
function Zo(i) {
  var e, t;
  let n = (e = i.video) !== null && e !== void 0 ? e : !0;
  return i.resolution && i.resolution.width > 0 && i.resolution.height > 0 && (n = typeof n == "boolean" ? {} : n, De() ? n = h(h({}, n), {}, {
    width: {
      max: i.resolution.width
    },
    height: {
      max: i.resolution.height
    },
    frameRate: i.resolution.frameRate
  }) : n = h(h({}, n), {}, {
    width: {
      ideal: i.resolution.width
    },
    height: {
      ideal: i.resolution.height
    },
    frameRate: i.resolution.frameRate
  })), {
    audio: (t = i.audio) !== null && t !== void 0 ? t : !1,
    video: n,
    // @ts-expect-error support for experimental display media features
    controller: i.controller,
    selfBrowserSurface: i.selfBrowserSurface,
    surfaceSwitching: i.surfaceSwitching,
    systemAudio: i.systemAudio,
    preferCurrentTab: i.preferCurrentTab
  };
}
function kr(i) {
  const e = i.split("/")[1].toLowerCase();
  if (!br.includes(e))
    throw Error("Video codec not supported: ".concat(e));
  return e;
}
function ec(i) {
  const e = [];
  return i.forEach((t) => {
    t.track !== void 0 && e.push(new Bi({
      cid: t.track.mediaStreamID,
      track: t.trackInfo
    }));
  }), e;
}
function _(i) {
  return i instanceof v ? {
    trackID: i.sid,
    source: i.source,
    muted: i.isMuted,
    enabled: i.mediaStreamTrack.enabled,
    kind: i.kind,
    streamID: i.mediaStreamID,
    streamTrackID: i.mediaStreamTrack.id
  } : {
    trackID: i.trackSid,
    enabled: i.isEnabled,
    muted: i.isMuted,
    trackInfo: h({
      mimeType: i.mimeType,
      name: i.trackName,
      encrypted: i.isEncrypted,
      kind: i.kind,
      source: i.source
    }, i.track ? _(i.track) : {})
  };
}
const tc = "|", wn = "https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension";
function ic(i) {
  const e = i.split(tc);
  return e.length > 1 ? [e[0], i.substr(e[0].length + 1)] : [i, ""];
}
async function ge(i) {
  return new Promise((e) => Y.setTimeout(e, i));
}
function Ri() {
  return "addTransceiver" in RTCPeerConnection.prototype;
}
function Ii() {
  return "addTrack" in RTCPeerConnection.prototype;
}
function yr() {
  if (!("getCapabilities" in RTCRtpSender) || De())
    return !1;
  const i = RTCRtpSender.getCapabilities("video");
  let e = !1;
  if (i) {
    for (const t of i.codecs)
      if (t.mimeType === "video/AV1") {
        e = !0;
        break;
      }
  }
  return e;
}
function Tr() {
  if (!("getCapabilities" in RTCRtpSender) || Qe())
    return !1;
  if (De()) {
    const t = be();
    if (t != null && t.version && vt(t.version, "16") < 0)
      return !1;
  }
  const i = RTCRtpSender.getCapabilities("video");
  let e = !1;
  if (i) {
    for (const t of i.codecs)
      if (t.mimeType === "video/VP9") {
        e = !0;
        break;
      }
  }
  return e;
}
function gt(i) {
  return i === "av1" || i === "vp9";
}
function xi(i) {
  return document ? (i || (i = document.createElement("audio")), "setSinkId" in i) : !1;
}
function nc() {
  return typeof RTCPeerConnection == "undefined" ? !1 : Ri() || Ii();
}
function Qe() {
  var i;
  return ((i = be()) === null || i === void 0 ? void 0 : i.name) === "Firefox";
}
function De() {
  var i;
  return ((i = be()) === null || i === void 0 ? void 0 : i.name) === "Safari";
}
function sc() {
  const i = be();
  return (i == null ? void 0 : i.name) === "Safari" && i.version.startsWith("17.");
}
function Sr() {
  var i, e;
  return ee() ? (
    // @ts-expect-error `userAgentData` is not yet part of typescript
    (i = (e = navigator.userAgentData) === null || e === void 0 ? void 0 : e.mobile) !== null && i !== void 0 ? i : /Tablet|iPad|Mobile|Android|BlackBerry/.test(navigator.userAgent)
  ) : !1;
}
function rc() {
  const i = be(), e = "17.2";
  if (i)
    return i.name !== "Safari" && i.os !== "iOS" || i.os === "iOS" && i.osVersion && vt(e, i.osVersion) >= 0 ? !0 : i.name === "Safari" && vt(e, i.version) >= 0;
}
function ee() {
  return typeof document != "undefined";
}
function Ce() {
  return navigator.product == "ReactNative";
}
function Mi(i) {
  return i.hostname.endsWith(".livekit.cloud") || i.hostname.endsWith(".livekit.run");
}
function Cr() {
  if (global && global.LiveKitReactNativeGlobal)
    return global.LiveKitReactNativeGlobal;
}
function Pr() {
  if (!Ce())
    return;
  let i = Cr();
  if (i)
    return i.platform;
}
function En() {
  if (ee())
    return window.devicePixelRatio;
  if (Ce()) {
    let i = Cr();
    if (i)
      return i.devicePixelRatio;
  }
  return 1;
}
function vt(i, e) {
  const t = i.split("."), n = e.split("."), s = Math.min(t.length, n.length);
  for (let r = 0; r < s; ++r) {
    const a = parseInt(t[r], 10), o = parseInt(n[r], 10);
    if (a > o)
      return 1;
    if (a < o)
      return -1;
    if (r === s - 1 && a === o)
      return 0;
  }
  return i === "" && e !== "" ? -1 : e === "" ? 1 : t.length == n.length ? 0 : t.length < n.length ? -1 : 1;
}
function ac(i) {
  for (const e of i)
    e.target.handleResize(e);
}
function oc(i) {
  for (const e of i)
    e.target.handleVisibilityChanged(e);
}
let ii = null;
const Rn = () => (ii || (ii = new ResizeObserver(ac)), ii);
let ni = null;
const In = () => (ni || (ni = new IntersectionObserver(oc, {
  root: null,
  rootMargin: "0px"
})), ni);
function cc() {
  const i = new Ua({
    sdk: ms.JS,
    protocol: Ho,
    version: Go
  });
  if (Ce()) {
    var e;
    i.os = (e = Pr()) !== null && e !== void 0 ? e : "";
  }
  return i;
}
function xn() {
  let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 16, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 16, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  const s = document.createElement("canvas");
  s.width = i, s.height = e;
  const r = s.getContext("2d");
  r == null || r.fillRect(0, 0, s.width, s.height), n && r && (r.beginPath(), r.arc(i / 2, e / 2, 50, 0, Math.PI * 2, !0), r.closePath(), r.fillStyle = "grey", r.fill());
  const a = s.captureStream(), [o] = a.getTracks();
  if (!o)
    throw Error("Could not get empty media stream video track");
  return o.enabled = t, o;
}
let nt;
function si() {
  if (!nt) {
    const i = new AudioContext(), e = i.createOscillator(), t = i.createGain();
    t.gain.setValueAtTime(0, 0);
    const n = i.createMediaStreamDestination();
    if (e.connect(t), t.connect(n), e.start(), [nt] = n.stream.getAudioTracks(), !nt)
      throw Error("Could not get empty media stream audio track");
    nt.enabled = !1;
  }
  return nt.clone();
}
class wr {
  constructor(e, t) {
    this.onFinally = t, this.promise = new Promise(async (n, s) => {
      this.resolve = n, this.reject = s, e && await e(n, s);
    }).finally(() => {
      var n;
      return (n = this.onFinally) === null || n === void 0 ? void 0 : n.call(this);
    });
  }
}
function dc(i, e) {
  const t = h({
    cloneTrack: !1,
    fftSize: 2048,
    smoothingTimeConstant: 0.8,
    minDecibels: -100,
    maxDecibels: -80
  }, e), n = zi();
  if (!n)
    throw new Error("Audio Context not supported on this browser");
  const s = t.cloneTrack ? i.mediaStreamTrack.clone() : i.mediaStreamTrack, r = n.createMediaStreamSource(new MediaStream([s])), a = n.createAnalyser();
  a.minDecibels = t.minDecibels, a.maxDecibels = t.maxDecibels, a.fftSize = t.fftSize, a.smoothingTimeConstant = t.smoothingTimeConstant, r.connect(a);
  const o = new Uint8Array(a.frequencyBinCount);
  return {
    calculateVolume: () => {
      a.getByteFrequencyData(o);
      let l = 0;
      for (const p of o)
        l += Math.pow(p / 255, 2);
      return Math.sqrt(l / o.length);
    },
    analyser: a,
    cleanup: async () => {
      await n.close(), t.cloneTrack && s.stop();
    }
  };
}
class ne {
  constructor() {
    this._locking = Promise.resolve(), this._locks = 0;
  }
  isLocked() {
    return this._locks > 0;
  }
  lock() {
    this._locks += 1;
    let e;
    const t = new Promise((s) => e = () => {
      this._locks -= 1, s();
    }), n = this._locking.then(() => e);
    return this._locking = this._locking.then(() => t), n;
  }
}
function lc(i) {
  return br.includes(i);
}
function Te(i) {
  if (typeof i == "string")
    return i;
  if (Array.isArray(i))
    return i[0];
  if (i.exact)
    return Array.isArray(i.exact) ? i.exact[0] : i.exact;
  if (i.ideal)
    return Array.isArray(i.ideal) ? i.ideal[0] : i.ideal;
  throw Error("could not unwrap constraint");
}
function uc(i) {
  return i.startsWith("http") ? i.replace(/^(http)/, "ws") : i;
}
function Mn(i) {
  return i.startsWith("ws") ? i.replace(/^(ws)/, "http") : i;
}
var Wi;
const Dn = "default";
class se {
  static getInstance() {
    return this.instance === void 0 && (this.instance = new se()), this.instance;
  }
  async getDevices(e) {
    var t;
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    if (((t = se.userMediaPromiseMap) === null || t === void 0 ? void 0 : t.size) > 0) {
      I.debug("awaiting getUserMedia promise");
      try {
        e ? await se.userMediaPromiseMap.get(e) : await Promise.all(se.userMediaPromiseMap.values());
      } catch {
        I.warn("error waiting for media permissons");
      }
    }
    let s = await navigator.mediaDevices.enumerateDevices();
    if (n && // for safari we need to skip this check, as otherwise it will re-acquire user media and fail on iOS https://bugs.webkit.org/show_bug.cgi?id=179363
    !(De() && this.hasDeviceInUse(e)) && (s.length === 0 || s.some((a) => {
      const o = a.label === "", c = e ? a.kind === e : !0;
      return o && c;
    }))) {
      const a = {
        video: e !== "audioinput" && e !== "audiooutput",
        audio: e !== "videoinput"
      }, o = await navigator.mediaDevices.getUserMedia(a);
      s = await navigator.mediaDevices.enumerateDevices(), o.getTracks().forEach((c) => {
        c.stop();
      });
    }
    return e && (s = s.filter((r) => r.kind === e)), s;
  }
  async normalizeDeviceId(e, t, n) {
    if (t !== Dn)
      return t;
    const s = await this.getDevices(e), r = new Map(s.map((o) => [o.groupId, 0]));
    s.forEach((o) => {
      var c;
      return r.set(o.groupId, ((c = r.get(o.groupId)) !== null && c !== void 0 ? c : 0) + 1);
    });
    const a = s.find((o) => {
      var c;
      return (n === o.groupId || ((c = r.get(o.groupId)) !== null && c !== void 0 ? c : 0) > 1) && o.deviceId !== Dn;
    });
    return a == null ? void 0 : a.deviceId;
  }
  hasDeviceInUse(e) {
    return e ? se.userMediaPromiseMap.has(e) : se.userMediaPromiseMap.size > 0;
  }
}
Wi = se;
Wi.mediaDeviceKinds = ["audioinput", "audiooutput", "videoinput"];
Wi.userMediaPromiseMap = /* @__PURE__ */ new Map();
const hc = 1e3;
class bt extends v {
  /**
   *
   * @param mediaTrack
   * @param kind
   * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
   * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
   */
  constructor(e, t, n) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, r = arguments.length > 4 ? arguments[4] : void 0;
    super(e, t, r), this._isUpstreamPaused = !1, this.handleTrackMuteEvent = () => this.debouncedTrackMuteHandler().catch(() => this.log.debug("track mute bounce got cancelled by an unmute event", this.logContext)), this.debouncedTrackMuteHandler = Gi(async () => {
      await this.pauseUpstream();
    }, 5e3), this.handleTrackUnmuteEvent = async () => {
      this.debouncedTrackMuteHandler.cancel("unmute"), await this.resumeUpstream();
    }, this.handleEnded = () => {
      this.isInBackground && (this.reacquireTrack = !0), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent), this.emit(T.Ended, this);
    }, this.reacquireTrack = !1, this.providedByUser = s, this.muteLock = new ne(), this.pauseUpstreamLock = new ne(), this.processorLock = new ne(), this.restartLock = new ne(), this.setMediaStreamTrack(e, !0), this._constraints = e.getConstraints(), n && (this._constraints = n);
  }
  get constraints() {
    return this._constraints;
  }
  get id() {
    return this._mediaStreamTrack.id;
  }
  get dimensions() {
    if (this.kind !== v.Kind.Video)
      return;
    const {
      width: e,
      height: t
    } = this._mediaStreamTrack.getSettings();
    if (e && t)
      return {
        width: e,
        height: t
      };
  }
  get isUpstreamPaused() {
    return this._isUpstreamPaused;
  }
  get isUserProvided() {
    return this.providedByUser;
  }
  get mediaStreamTrack() {
    var e, t;
    return (e = (t = this.processor) === null || t === void 0 ? void 0 : t.processedTrack) !== null && e !== void 0 ? e : this._mediaStreamTrack;
  }
  async setMediaStreamTrack(e, t) {
    if (e === this._mediaStreamTrack && !t)
      return;
    this._mediaStreamTrack && (this.attachedElements.forEach((r) => {
      He(this._mediaStreamTrack, r);
    }), this.debouncedTrackMuteHandler.cancel("new-track"), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent)), this.mediaStream = new MediaStream([e]), e && (e.addEventListener("ended", this.handleEnded), e.addEventListener("mute", this.handleTrackMuteEvent), e.addEventListener("unmute", this.handleTrackUnmuteEvent), this._constraints = e.getConstraints());
    let n;
    if (this.processor && e) {
      const r = await this.processorLock.lock();
      try {
        if (this.log.debug("restarting processor", this.logContext), this.kind === "unknown")
          throw TypeError("cannot set processor on track of unknown kind");
        this.processorElement && (Ve(e, this.processorElement), this.processorElement.muted = !0), await this.processor.restart({
          track: e,
          kind: this.kind,
          element: this.processorElement
        }), n = this.processor.processedTrack;
      } finally {
        r();
      }
    }
    if (this.sender) {
      var s;
      await this.sender.replaceTrack((s = n) !== null && s !== void 0 ? s : e);
    }
    !this.providedByUser && this._mediaStreamTrack !== e && this._mediaStreamTrack.stop(), this._mediaStreamTrack = e, e && (this._mediaStreamTrack.enabled = !this.isMuted, await this.resumeUpstream(), this.attachedElements.forEach((r) => {
      var a;
      Ve((a = n) !== null && a !== void 0 ? a : e, r);
    }));
  }
  async waitForDimensions() {
    var e;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : hc;
    if (this.kind === v.Kind.Audio)
      throw new Error("cannot get dimensions for audio tracks");
    ((e = be()) === null || e === void 0 ? void 0 : e.os) === "iOS" && await ge(10);
    const n = Date.now();
    for (; Date.now() - n < t; ) {
      const s = this.dimensions;
      if (s)
        return s;
      await ge(50);
    }
    throw new ce("unable to get track dimensions after timeout");
  }
  /**
   * @returns DeviceID of the device that is currently being used for this track
   */
  async getDeviceId() {
    if (this.source === v.Source.ScreenShare)
      return;
    const {
      deviceId: e,
      groupId: t
    } = this._mediaStreamTrack.getSettings(), n = this.kind === v.Kind.Audio ? "audioinput" : "videoinput";
    return se.getInstance().normalizeDeviceId(n, e, t);
  }
  async mute() {
    return this.setTrackMuted(!0), this;
  }
  async unmute() {
    return this.setTrackMuted(!1), this;
  }
  async replaceTrack(e, t) {
    var n;
    if (!this.sender)
      throw new ce("unable to replace an unpublished track");
    let s, r;
    return typeof t == "boolean" ? s = t : t !== void 0 && (s = t.userProvidedTrack, r = t.stopProcessor), this.providedByUser = (n = s) !== null && n !== void 0 ? n : !0, this.log.debug("replace MediaStreamTrack", this.logContext), await this.setMediaStreamTrack(e), r && this.processor && await this.stopProcessor(), this;
  }
  async restart(e) {
    const t = await this.restartLock.lock();
    try {
      e || (e = this._constraints), this.log.debug("restarting track with constraints", h(h({}, this.logContext), {}, {
        constraints: e
      }));
      const n = {
        audio: !1,
        video: !1
      };
      this.kind === v.Kind.Video ? n.video = e : n.audio = e, this.attachedElements.forEach((a) => {
        He(this.mediaStreamTrack, a);
      }), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.stop();
      const r = (await navigator.mediaDevices.getUserMedia(n)).getTracks()[0];
      return r.addEventListener("ended", this.handleEnded), this.log.debug("re-acquired MediaStreamTrack", this.logContext), await this.setMediaStreamTrack(r), this._constraints = e, this.emit(T.Restarted, this), this;
    } finally {
      t();
    }
  }
  setTrackMuted(e) {
    this.log.debug("setting ".concat(this.kind, " track ").concat(e ? "muted" : "unmuted"), this.logContext), !(this.isMuted === e && this._mediaStreamTrack.enabled !== e) && (this.isMuted = e, this._mediaStreamTrack.enabled = !e, this.emit(e ? T.Muted : T.Unmuted, this));
  }
  get needsReAcquisition() {
    return this._mediaStreamTrack.readyState !== "live" || this._mediaStreamTrack.muted || !this._mediaStreamTrack.enabled || this.reacquireTrack;
  }
  async handleAppVisibilityChanged() {
    await super.handleAppVisibilityChanged(), Sr() && (this.log.debug("visibility changed, is in Background: ".concat(this.isInBackground), this.logContext), !this.isInBackground && this.needsReAcquisition && !this.isUserProvided && !this.isMuted && (this.log.debug("track needs to be reacquired, restarting ".concat(this.source), this.logContext), await this.restart(), this.reacquireTrack = !1));
  }
  stop() {
    var e;
    super.stop(), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent), (e = this.processor) === null || e === void 0 || e.destroy(), this.processor = void 0;
  }
  /**
   * pauses publishing to the server without disabling the local MediaStreamTrack
   * this is used to display a user's own video locally while pausing publishing to
   * the server.
   * this API is unsupported on Safari < 12 due to a bug
   **/
  async pauseUpstream() {
    const e = await this.pauseUpstreamLock.lock();
    try {
      if (this._isUpstreamPaused === !0)
        return;
      if (!this.sender) {
        this.log.warn("unable to pause upstream for an unpublished track", this.logContext);
        return;
      }
      this._isUpstreamPaused = !0, this.emit(T.UpstreamPaused, this);
      const t = be();
      if ((t == null ? void 0 : t.name) === "Safari" && vt(t.version, "12.0") < 0)
        throw new ji("pauseUpstream is not supported on Safari < 12.");
      await this.sender.replaceTrack(null);
    } finally {
      e();
    }
  }
  async resumeUpstream() {
    const e = await this.pauseUpstreamLock.lock();
    try {
      if (this._isUpstreamPaused === !1)
        return;
      if (!this.sender) {
        this.log.warn("unable to resume upstream for an unpublished track", this.logContext);
        return;
      }
      this._isUpstreamPaused = !1, this.emit(T.UpstreamResumed, this), await this.sender.replaceTrack(this._mediaStreamTrack);
    } finally {
      e();
    }
  }
  /**
   * Gets the RTCStatsReport for the LocalTrack's underlying RTCRtpSender
   * See https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport
   *
   * @returns Promise<RTCStatsReport> | undefined
   */
  async getRTCStatsReport() {
    var e;
    return (e = this.sender) !== null && e !== void 0 && e.getStats ? await this.sender.getStats() : void 0;
  }
  /**
   * Sets a processor on this track.
   * See https://github.com/livekit/track-processors-js for example usage
   *
   * @experimental
   *
   * @param processor
   * @param showProcessedStreamLocally
   * @returns
   */
  async setProcessor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const n = await this.processorLock.lock();
    try {
      var s;
      this.log.debug("setting up processor", this.logContext), this.processorElement = (s = this.processorElement) !== null && s !== void 0 ? s : document.createElement(this.kind);
      const a = {
        kind: this.kind,
        track: this._mediaStreamTrack,
        element: this.processorElement,
        audioContext: this.audioContext
      };
      if (await e.init(a), this.processor && await this.stopProcessor(), this.kind === "unknown")
        throw TypeError("cannot set processor on track of unknown kind");
      if (Ve(this._mediaStreamTrack, this.processorElement), this.processorElement.muted = !0, this.processorElement.play().catch((o) => this.log.error("failed to play processor element", h(h({}, this.logContext), {}, {
        error: o
      }))), this.processor = e, this.processor.processedTrack) {
        var r;
        for (const o of this.attachedElements)
          o !== this.processorElement && t && (He(this._mediaStreamTrack, o), Ve(this.processor.processedTrack, o));
        await ((r = this.sender) === null || r === void 0 ? void 0 : r.replaceTrack(this.processor.processedTrack));
      }
      this.emit(T.TrackProcessorUpdate, this.processor);
    } finally {
      n();
    }
  }
  getProcessor() {
    return this.processor;
  }
  /**
   * Stops the track processor
   * See https://github.com/livekit/track-processors-js for example usage
   *
   * @experimental
   * @returns
   */
  async stopProcessor() {
    var e, t;
    this.processor && (this.log.debug("stopping processor", this.logContext), (e = this.processor.processedTrack) === null || e === void 0 || e.stop(), await this.processor.destroy(), this.processor = void 0, (t = this.processorElement) === null || t === void 0 || t.remove(), this.processorElement = void 0, await this._mediaStreamTrack.applyConstraints(this._constraints), await this.setMediaStreamTrack(this._mediaStreamTrack, !0), this.emit(T.TrackProcessorUpdate));
  }
}
class pc extends Pe.EventEmitter {
  constructor(e) {
    super(), this.onWorkerMessage = (t) => {
      var n;
      const {
        kind: s,
        data: r
      } = t.data;
      switch (s) {
        case "error":
          I.error(r.error.message), this.emit(Ee.EncryptionError, r.error);
          break;
        case "initAck":
          r.enabled && this.keyProvider.getKeys().forEach((o) => {
            this.postKey(o);
          });
          break;
        case "enable":
          if (this.encryptionEnabled !== r.enabled && r.participantIdentity === ((n = this.room) === null || n === void 0 ? void 0 : n.localParticipant.identity))
            this.emit(Ee.ParticipantEncryptionStatusChanged, r.enabled, this.room.localParticipant), this.encryptionEnabled = r.enabled;
          else if (r.participantIdentity) {
            var a;
            const o = (a = this.room) === null || a === void 0 ? void 0 : a.getParticipantByIdentity(r.participantIdentity);
            if (!o)
              throw TypeError("couldn't set encryption status, participant not found".concat(r.participantIdentity));
            this.emit(Ee.ParticipantEncryptionStatusChanged, r.enabled, o);
          }
          this.encryptionEnabled && this.keyProvider.getKeys().forEach((o) => {
            this.postKey(o);
          });
          break;
        case "ratchetKey":
          this.keyProvider.emit(xe.KeyRatcheted, r.material, r.keyIndex);
          break;
      }
    }, this.onWorkerError = (t) => {
      I.error("e2ee worker encountered an error:", {
        error: t.error
      }), this.emit(Ee.EncryptionError, t.error);
    }, this.keyProvider = e.keyProvider, this.worker = e.worker, this.encryptionEnabled = !1;
  }
  /**
   * @internal
   */
  setup(e) {
    if (!Ao())
      throw new ji("tried to setup end-to-end encryption on an unsupported browser");
    if (I.info("setting up e2ee"), e !== this.room) {
      this.room = e, this.setupEventListeners(e, this.keyProvider);
      const t = {
        kind: "init",
        data: {
          keyProviderOptions: this.keyProvider.getOptions(),
          loglevel: uo.getLevel()
        }
      };
      this.worker && (I.info("initializing worker", {
        worker: this.worker
      }), this.worker.onmessage = this.onWorkerMessage, this.worker.onerror = this.onWorkerError, this.worker.postMessage(t));
    }
  }
  /**
   * @internal
   */
  setParticipantCryptorEnabled(e, t) {
    I.debug("set e2ee to ".concat(e, " for participant ").concat(t)), this.postEnable(e, t);
  }
  /**
   * @internal
   */
  setSifTrailer(e) {
    !e || e.length === 0 ? I.warn("ignoring server sent trailer as it's empty") : this.postSifTrailer(e);
  }
  setupEngine(e) {
    e.on(P.RTPVideoMapUpdate, (t) => {
      this.postRTPMap(t);
    });
  }
  setupEventListeners(e, t) {
    e.on(k.TrackPublished, (n, s) => this.setParticipantCryptorEnabled(n.trackInfo.encryption !== te.NONE, s.identity)), e.on(k.ConnectionStateChanged, (n) => {
      n === $t.Connected && e.remoteParticipants.forEach((s) => {
        s.trackPublications.forEach((r) => {
          this.setParticipantCryptorEnabled(r.trackInfo.encryption !== te.NONE, s.identity);
        });
      });
    }).on(k.TrackUnsubscribed, (n, s, r) => {
      var a;
      const o = {
        kind: "removeTransform",
        data: {
          participantIdentity: r.identity,
          trackId: n.mediaStreamID
        }
      };
      (a = this.worker) === null || a === void 0 || a.postMessage(o);
    }).on(k.TrackSubscribed, (n, s, r) => {
      this.setupE2EEReceiver(n, r.identity, s.trackInfo);
    }).on(k.SignalConnected, () => {
      if (!this.room)
        throw new TypeError("expected room to be present on signal connect");
      this.setParticipantCryptorEnabled(this.room.localParticipant.isE2EEEnabled, this.room.localParticipant.identity), t.getKeys().forEach((n) => {
        this.postKey(n);
      });
    }), e.localParticipant.on(C.LocalTrackPublished, async (n) => {
      this.setupE2EESender(n.track, n.track.sender);
    }), t.on(xe.SetKey, (n) => this.postKey(n)).on(xe.RatchetRequest, (n, s) => this.postRatchetRequest(n, s));
  }
  postRatchetRequest(e, t) {
    if (!this.worker)
      throw Error("could not ratchet key, worker is missing");
    const n = {
      kind: "ratchetRequest",
      data: {
        participantIdentity: e,
        keyIndex: t
      }
    };
    this.worker.postMessage(n);
  }
  postKey(e) {
    var t;
    let {
      key: n,
      participantIdentity: s,
      keyIndex: r
    } = e;
    if (!this.worker)
      throw Error("could not set key, worker is missing");
    const a = {
      kind: "setKey",
      data: {
        participantIdentity: s,
        isPublisher: s === ((t = this.room) === null || t === void 0 ? void 0 : t.localParticipant.identity),
        key: n,
        keyIndex: r
      }
    };
    this.worker.postMessage(a);
  }
  postEnable(e, t) {
    if (this.worker) {
      const n = {
        kind: "enable",
        data: {
          enabled: e,
          participantIdentity: t
        }
      };
      this.worker.postMessage(n);
    } else
      throw new ReferenceError("failed to enable e2ee, worker is not ready");
  }
  postRTPMap(e) {
    var t;
    if (!this.worker)
      throw TypeError("could not post rtp map, worker is missing");
    if (!((t = this.room) !== null && t !== void 0 && t.localParticipant.identity))
      throw TypeError("could not post rtp map, local participant identity is missing");
    const n = {
      kind: "setRTPMap",
      data: {
        map: e,
        participantIdentity: this.room.localParticipant.identity
      }
    };
    this.worker.postMessage(n);
  }
  postSifTrailer(e) {
    if (!this.worker)
      throw Error("could not post SIF trailer, worker is missing");
    const t = {
      kind: "setSifTrailer",
      data: {
        trailer: e
      }
    };
    this.worker.postMessage(t);
  }
  setupE2EEReceiver(e, t, n) {
    if (e.receiver) {
      if (!(n != null && n.mimeType) || n.mimeType === "")
        throw new TypeError("MimeType missing from trackInfo, cannot set up E2EE cryptor");
      this.handleReceiver(e.receiver, e.mediaStreamID, t, e.kind === "video" ? kr(n.mimeType) : void 0);
    }
  }
  setupE2EESender(e, t) {
    if (!(e instanceof bt) || !t) {
      t || I.warn("early return because sender is not ready");
      return;
    }
    this.handleSender(t, e.mediaStreamID, void 0);
  }
  /**
   * Handles the given {@code RTCRtpReceiver} by creating a {@code TransformStream} which will inject
   * a frame decoder.
   *
   */
  async handleReceiver(e, t, n, s) {
    if (this.worker) {
      if (Si()) {
        const r = {
          kind: "decode",
          participantIdentity: n,
          trackId: t,
          codec: s
        };
        e.transform = new RTCRtpScriptTransform(this.worker, r);
      } else {
        if (Ct in e && s) {
          const c = {
            kind: "updateCodec",
            data: {
              trackId: t,
              codec: s,
              participantIdentity: n
            }
          };
          this.worker.postMessage(c);
          return;
        }
        let r = e.writableStream, a = e.readableStream;
        if (!r || !a) {
          const c = e.createEncodedStreams();
          e.writableStream = c.writable, r = c.writable, e.readableStream = c.readable, a = c.readable;
        }
        const o = {
          kind: "decode",
          data: {
            readableStream: a,
            writableStream: r,
            trackId: t,
            codec: s,
            participantIdentity: n
          }
        };
        this.worker.postMessage(o, [a, r]);
      }
      e[Ct] = !0;
    }
  }
  /**
   * Handles the given {@code RTCRtpSender} by creating a {@code TransformStream} which will inject
   * a frame encoder.
   *
   */
  handleSender(e, t, n) {
    var s;
    if (!(Ct in e || !this.worker)) {
      if (!((s = this.room) !== null && s !== void 0 && s.localParticipant.identity) || this.room.localParticipant.identity === "")
        throw TypeError("local identity needs to be known in order to set up encrypted sender");
      if (Si()) {
        I.info("initialize script transform");
        const r = {
          kind: "encode",
          participantIdentity: this.room.localParticipant.identity,
          trackId: t,
          codec: n
        };
        e.transform = new RTCRtpScriptTransform(this.worker, r);
      } else {
        I.info("initialize encoded streams");
        const r = e.createEncodedStreams(), a = {
          kind: "encode",
          data: {
            readableStream: r.readable,
            writableStream: r.writable,
            codec: n,
            trackId: t,
            participantIdentity: this.room.localParticipant.identity
          }
        };
        this.worker.postMessage(a, [r.readable, r.writable]);
      }
      e[Ct] = !0;
    }
  }
}
class fc {
  constructor() {
    this.pendingTasks = /* @__PURE__ */ new Map(), this.taskMutex = new ne(), this.nextTaskIndex = 0;
  }
  async run(e) {
    const t = {
      id: this.nextTaskIndex++,
      enqueuedAt: Date.now(),
      status: 0
      /* WAITING */
    };
    this.pendingTasks.set(t.id, t);
    const n = await this.taskMutex.lock();
    try {
      return t.executedAt = Date.now(), t.status = 1, await e();
    } finally {
      t.status = 2, this.pendingTasks.delete(t.id), n();
    }
  }
  async flush() {
    return this.run(async () => {
    });
  }
  snapshot() {
    return Array.from(this.pendingTasks.values());
  }
}
const mc = ["syncState", "trickle", "offer", "answer", "simulate", "leave"];
function gc(i) {
  const e = mc.indexOf(i.case) >= 0;
  return I.trace("request allowed to bypass queue:", {
    canPass: e,
    req: i
  }), e;
}
var at = /* @__PURE__ */ ((i) => (i[i.CONNECTING = 0] = "CONNECTING", i[i.CONNECTED = 1] = "CONNECTED", i[i.RECONNECTING = 2] = "RECONNECTING", i[i.DISCONNECTING = 3] = "DISCONNECTING", i[i.DISCONNECTED = 4] = "DISCONNECTED", i))(at || {});
class vc {
  constructor() {
    var e;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.rtt = 0, this.state = 4, this.log = I, this.resetCallbacks = () => {
      this.onAnswer = void 0, this.onLeave = void 0, this.onLocalTrackPublished = void 0, this.onLocalTrackUnpublished = void 0, this.onNegotiateRequested = void 0, this.onOffer = void 0, this.onRemoteMuteChanged = void 0, this.onSubscribedQualityUpdate = void 0, this.onTokenRefresh = void 0, this.onTrickle = void 0, this.onClose = void 0;
    }, this.log = ve((e = n.loggerName) !== null && e !== void 0 ? e : de.Signal), this.loggerContextCb = n.loggerContextCb, this.useJSON = t, this.requestQueue = new fc(), this.queuedRequests = [], this.closingLock = new ne(), this.connectionLock = new ne(), this.state = 4;
  }
  get currentState() {
    return this.state;
  }
  get isDisconnected() {
    return this.state === 3 || this.state === 4;
  }
  get isEstablishingConnection() {
    return this.state === 0 || this.state === 2;
  }
  get logContext() {
    var e, t;
    return (e = (t = this.loggerContextCb) === null || t === void 0 ? void 0 : t.call(this)) !== null && e !== void 0 ? e : {};
  }
  async join(e, t, n, s) {
    return this.state = 0, this.options = n, await this.connect(e, t, n, s);
  }
  async reconnect(e, t, n, s) {
    if (!this.options) {
      this.log.warn("attempted to reconnect without signal options being set, ignoring", this.logContext);
      return;
    }
    return this.state = 2, this.clearPingInterval(), await this.connect(e, t, h(h({}, this.options), {}, {
      reconnect: !0,
      sid: n,
      reconnectReason: s
    }));
  }
  connect(e, t, n, s) {
    this.connectOptions = n, e = uc(e), e = e.replace(/\/$/, ""), e += "/rtc";
    const r = cc(), a = bc(t, r, n);
    return new Promise(async (o, c) => {
      const d = await this.connectionLock.lock();
      try {
        const l = async () => {
          this.close(), clearTimeout(u), c(new L("room connection has been cancelled (signal)"));
        }, u = setTimeout(() => {
          this.close(), c(new L("room connection has timed out (signal)"));
        }, n.websocketTimeout);
        s != null && s.aborted && l(), s == null || s.addEventListener("abort", l), this.log.debug("connecting to ".concat(e + a), this.logContext), this.ws && await this.close(!1), this.ws = new WebSocket(e + a), this.ws.binaryType = "arraybuffer", this.ws.onopen = () => {
          clearTimeout(u);
        }, this.ws.onerror = async (p) => {
          if (this.state !== 1) {
            this.state = 4, clearTimeout(u);
            try {
              const f = await fetch("http".concat(e.substring(2), "/validate").concat(a));
              if (f.status.toFixed(0).startsWith("4")) {
                const b = await f.text();
                c(new L(b, J.NotAllowed, f.status));
              } else
                c(new L("Internal error", J.InternalError, f.status));
            } catch {
              c(new L("server was not reachable", J.ServerUnreachable));
            }
            return;
          }
          this.handleWSError(p);
        }, this.ws.onmessage = async (p) => {
          let f;
          if (typeof p.data == "string") {
            const S = JSON.parse(p.data);
            f = mn.fromJson(S, {
              ignoreUnknownFields: !0
            });
          } else if (p.data instanceof ArrayBuffer)
            f = mn.fromBinary(new Uint8Array(p.data));
          else {
            this.log.error("could not decode websocket message: ".concat(typeof p.data), this.logContext);
            return;
          }
          if (this.state !== 1) {
            var b;
            let S = !1;
            if (((b = f.message) === null || b === void 0 ? void 0 : b.case) === "join")
              this.state = 1, s == null || s.removeEventListener("abort", l), this.pingTimeoutDuration = f.message.value.pingTimeout, this.pingIntervalDuration = f.message.value.pingInterval, this.pingTimeoutDuration && this.pingTimeoutDuration > 0 && (this.log.debug("ping config", h(h({}, this.logContext), {}, {
                timeout: this.pingTimeoutDuration,
                interval: this.pingIntervalDuration
              })), this.startPingInterval()), o(f.message.value);
            else if (this.state === 2 && f.message.case !== "leave") {
              var y;
              this.state = 1, s == null || s.removeEventListener("abort", l), this.startPingInterval(), ((y = f.message) === null || y === void 0 ? void 0 : y.case) === "reconnect" ? o(f.message.value) : (this.log.debug("declaring signal reconnected without reconnect response received", this.logContext), o(void 0), S = !0);
            } else if (this.isEstablishingConnection && f.message.case === "leave")
              c(new L("Received leave request while trying to (re)connect", J.LeaveRequest));
            else if (!n.reconnect) {
              var w;
              c(new L("did not receive join response, got ".concat((w = f.message) === null || w === void 0 ? void 0 : w.case, " instead")));
            }
            if (!S)
              return;
          }
          this.signalLatency && await ge(this.signalLatency), this.handleSignalResponse(f);
        }, this.ws.onclose = (p) => {
          this.isEstablishingConnection && c(new L("Websocket got closed during a (re)connection attempt")), this.log.warn("websocket closed", h(h({}, this.logContext), {}, {
            reason: p.reason,
            code: p.code,
            wasClean: p.wasClean,
            state: this.state
          })), this.handleOnClose(p.reason);
        };
      } finally {
        d();
      }
    });
  }
  async close() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    const t = await this.closingLock.lock();
    try {
      if (e && (this.state = 3), this.ws) {
        this.ws.onmessage = null, this.ws.onopen = null, this.ws.onclose = null;
        const n = new Promise((s) => {
          this.ws ? this.ws.onclose = () => {
            s();
          } : s();
        });
        this.ws.readyState < this.ws.CLOSING && (this.ws.close(), await Promise.race([n, ge(250)])), this.ws = void 0;
      }
    } finally {
      e && (this.state = 4), this.clearPingInterval(), t();
    }
  }
  // initial offer after joining
  sendOffer(e) {
    this.log.debug("sending offer", h(h({}, this.logContext), {}, {
      offerSdp: e.sdp
    })), this.sendRequest({
      case: "offer",
      value: Kt(e)
    });
  }
  // answer a server-initiated offer
  sendAnswer(e) {
    return this.log.debug("sending answer", h(h({}, this.logContext), {}, {
      answerSdp: e.sdp
    })), this.sendRequest({
      case: "answer",
      value: Kt(e)
    });
  }
  sendIceCandidate(e, t) {
    return this.log.trace("sending ice candidate", h(h({}, this.logContext), {}, {
      candidate: e
    })), this.sendRequest({
      case: "trickle",
      value: new Ui({
        candidateInit: JSON.stringify(e),
        target: t
      })
    });
  }
  sendMuteTrack(e, t) {
    return this.sendRequest({
      case: "mute",
      value: new Fi({
        sid: e,
        muted: t
      })
    });
  }
  sendAddTrack(e) {
    return this.sendRequest({
      case: "addTrack",
      value: e
    });
  }
  sendUpdateLocalMetadata(e, t) {
    return this.sendRequest({
      case: "updateMetadata",
      value: new Ts({
        metadata: e,
        name: t
      })
    });
  }
  sendUpdateTrackSettings(e) {
    this.sendRequest({
      case: "trackSetting",
      value: e
    });
  }
  sendUpdateSubscription(e) {
    return this.sendRequest({
      case: "subscription",
      value: e
    });
  }
  sendSyncState(e) {
    return this.sendRequest({
      case: "syncState",
      value: e
    });
  }
  sendUpdateVideoLayers(e, t) {
    return this.sendRequest({
      case: "updateLayers",
      value: new ys({
        trackSid: e,
        layers: t
      })
    });
  }
  sendUpdateSubscriptionPermissions(e, t) {
    return this.sendRequest({
      case: "subscriptionPermission",
      value: new Ps({
        allParticipants: e,
        trackPermissions: t
      })
    });
  }
  sendSimulateScenario(e) {
    return this.sendRequest({
      case: "simulate",
      value: e
    });
  }
  sendPing() {
    return Promise.all([this.sendRequest({
      case: "ping",
      value: j.parse(Date.now())
    }), this.sendRequest({
      case: "pingReq",
      value: new Rs({
        timestamp: j.parse(Date.now()),
        rtt: j.parse(this.rtt)
      })
    })]);
  }
  sendUpdateLocalAudioTrack(e, t) {
    return this.sendRequest({
      case: "updateAudioTrack",
      value: new ks({
        trackSid: e,
        features: t
      })
    });
  }
  sendLeave() {
    return this.sendRequest({
      case: "leave",
      value: new zt({
        canReconnect: !1,
        reason: ut.CLIENT_INITIATED
      })
    });
  }
  async sendRequest(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (!t && !gc(e) && this.state === 2) {
      this.queuedRequests.push(async () => {
        await this.sendRequest(e, !0);
      });
      return;
    }
    if (t || await this.requestQueue.flush(), this.signalLatency && await ge(this.signalLatency), !this.ws || this.ws.readyState !== this.ws.OPEN) {
      this.log.error("cannot send signal request before connected, type: ".concat(e == null ? void 0 : e.case), this.logContext);
      return;
    }
    const s = new Va({
      message: e
    });
    try {
      this.useJSON ? this.ws.send(s.toJsonString()) : this.ws.send(s.toBinary());
    } catch (r) {
      this.log.error("error sending signal message", h(h({}, this.logContext), {}, {
        error: r
      }));
    }
  }
  handleSignalResponse(e) {
    const t = e.message;
    if (t == null) {
      this.log.debug("received unsupported message", this.logContext);
      return;
    }
    let n = !1;
    if (t.case === "answer") {
      const a = _n(t.value);
      this.onAnswer && this.onAnswer(a);
    } else if (t.case === "offer") {
      const a = _n(t.value);
      this.onOffer && this.onOffer(a);
    } else if (t.case === "trickle") {
      const a = JSON.parse(t.value.candidateInit);
      this.onTrickle && this.onTrickle(a, t.value.target);
    } else if (t.case === "update") {
      if (this.onParticipantUpdate) {
        var s;
        this.onParticipantUpdate((s = t.value.participants) !== null && s !== void 0 ? s : []);
      }
    } else if (t.case === "trackPublished")
      this.onLocalTrackPublished && this.onLocalTrackPublished(t.value);
    else if (t.case === "speakersChanged") {
      if (this.onSpeakersChanged) {
        var r;
        this.onSpeakersChanged((r = t.value.speakers) !== null && r !== void 0 ? r : []);
      }
    } else
      t.case === "leave" ? this.onLeave && this.onLeave(t.value) : t.case === "mute" ? this.onRemoteMuteChanged && this.onRemoteMuteChanged(t.value.sid, t.value.muted) : t.case === "roomUpdate" ? this.onRoomUpdate && t.value.room && this.onRoomUpdate(t.value.room) : t.case === "connectionQuality" ? this.onConnectionQuality && this.onConnectionQuality(t.value) : t.case === "streamStateUpdate" ? this.onStreamStateUpdate && this.onStreamStateUpdate(t.value) : t.case === "subscribedQualityUpdate" ? this.onSubscribedQualityUpdate && this.onSubscribedQualityUpdate(t.value) : t.case === "subscriptionPermissionUpdate" ? this.onSubscriptionPermissionUpdate && this.onSubscriptionPermissionUpdate(t.value) : t.case === "refreshToken" ? this.onTokenRefresh && this.onTokenRefresh(t.value) : t.case === "trackUnpublished" ? this.onLocalTrackUnpublished && this.onLocalTrackUnpublished(t.value) : t.case === "subscriptionResponse" ? this.onSubscriptionError && this.onSubscriptionError(t.value) : t.case === "pong" || (t.case === "pongResp" ? (this.rtt = Date.now() - Number.parseInt(t.value.lastPingTimestamp.toString()), this.resetPingTimeout(), n = !0) : this.log.debug("unsupported message", h(h({}, this.logContext), {}, {
        msgCase: t.case
      })));
    n || this.resetPingTimeout();
  }
  setReconnected() {
    for (; this.queuedRequests.length > 0; ) {
      const e = this.queuedRequests.shift();
      e && this.requestQueue.run(e);
    }
  }
  async handleOnClose(e) {
    if (this.state === 4)
      return;
    const t = this.onClose;
    await this.close(), this.log.debug("websocket connection closed: ".concat(e), h(h({}, this.logContext), {}, {
      reason: e
    })), t && t(e);
  }
  handleWSError(e) {
    this.log.error("websocket error", h(h({}, this.logContext), {}, {
      error: e
    }));
  }
  /**
   * Resets the ping timeout and starts a new timeout.
   * Call this after receiving a pong message
   */
  resetPingTimeout() {
    if (this.clearPingTimeout(), !this.pingTimeoutDuration) {
      this.log.warn("ping timeout duration not set", this.logContext);
      return;
    }
    this.pingTimeout = Y.setTimeout(() => {
      this.log.warn("ping timeout triggered. last pong received at: ".concat(new Date(Date.now() - this.pingTimeoutDuration * 1e3).toUTCString()), this.logContext), this.handleOnClose("ping timeout");
    }, this.pingTimeoutDuration * 1e3);
  }
  /**
   * Clears ping timeout (does not start a new timeout)
   */
  clearPingTimeout() {
    this.pingTimeout && Y.clearTimeout(this.pingTimeout);
  }
  startPingInterval() {
    if (this.clearPingInterval(), this.resetPingTimeout(), !this.pingIntervalDuration) {
      this.log.warn("ping interval duration not set", this.logContext);
      return;
    }
    this.log.debug("start ping interval", this.logContext), this.pingInterval = Y.setInterval(() => {
      this.sendPing();
    }, this.pingIntervalDuration * 1e3);
  }
  clearPingInterval() {
    this.log.debug("clearing ping interval", this.logContext), this.clearPingTimeout(), this.pingInterval && Y.clearInterval(this.pingInterval);
  }
}
function _n(i) {
  const e = {
    type: "offer",
    sdp: i.sdp
  };
  switch (i.type) {
    case "answer":
    case "offer":
    case "pranswer":
    case "rollback":
      e.type = i.type;
      break;
  }
  return e;
}
function Kt(i) {
  return new Me({
    sdp: i.sdp,
    type: i.type
  });
}
function bc(i, e, t) {
  var n;
  const s = new URLSearchParams();
  return s.set("access_token", i), t.reconnect && (s.set("reconnect", "1"), t.sid && s.set("sid", t.sid)), s.set("auto_subscribe", t.autoSubscribe ? "1" : "0"), s.set("sdk", Ce() ? "reactnative" : "js"), s.set("version", e.version), s.set("protocol", e.protocol.toString()), e.deviceModel && s.set("device_model", e.deviceModel), e.os && s.set("os", e.os), e.osVersion && s.set("os_version", e.osVersion), e.browser && s.set("browser", e.browser), e.browserVersion && s.set("browser_version", e.browserVersion), t.adaptiveStream && s.set("adaptive_stream", "1"), t.reconnectReason && s.set("reconnect_reason", t.reconnectReason.toString()), (n = navigator.connection) !== null && n !== void 0 && n.type && s.set("network", navigator.connection.type), "?".concat(s.toString());
}
var Er = {}, Rr = { exports: {} }, Ln = Rr.exports = {
  v: [{
    name: "version",
    reg: /^(\d*)$/
  }],
  o: [{
    // o=- 20518 0 IN IP4 203.0.113.1
    // NB: sessionId will be a String in most cases because it is huge
    name: "origin",
    reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
    names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
    format: "%s %s %d %s IP%d %s"
  }],
  // default parsing of these only (though some of these feel outdated)
  s: [{
    name: "name"
  }],
  i: [{
    name: "description"
  }],
  u: [{
    name: "uri"
  }],
  e: [{
    name: "email"
  }],
  p: [{
    name: "phone"
  }],
  z: [{
    name: "timezones"
  }],
  // TODO: this one can actually be parsed properly...
  r: [{
    name: "repeats"
  }],
  // TODO: this one can also be parsed properly
  // k: [{}], // outdated thing ignored
  t: [{
    // t=0 0
    name: "timing",
    reg: /^(\d*) (\d*)/,
    names: ["start", "stop"],
    format: "%d %d"
  }],
  c: [{
    // c=IN IP4 10.47.197.26
    name: "connection",
    reg: /^IN IP(\d) (\S*)/,
    names: ["version", "ip"],
    format: "IN IP%d %s"
  }],
  b: [{
    // b=AS:4000
    push: "bandwidth",
    reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
    names: ["type", "limit"],
    format: "%s:%s"
  }],
  m: [{
    // m=video 51744 RTP/AVP 126 97 98 34 31
    // NB: special - pushes to session
    // TODO: rtp/fmtp should be filtered by the payloads found here?
    reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
    names: ["type", "port", "protocol", "payloads"],
    format: "%s %d %s %s"
  }],
  a: [
    {
      // a=rtpmap:110 opus/48000/2
      push: "rtp",
      reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
      names: ["payload", "codec", "rate", "encoding"],
      format: function(i) {
        return i.encoding ? "rtpmap:%d %s/%s/%s" : i.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
      }
    },
    {
      // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
      // a=fmtp:111 minptime=10; useinbandfec=1
      push: "fmtp",
      reg: /^fmtp:(\d*) ([\S| ]*)/,
      names: ["payload", "config"],
      format: "fmtp:%d %s"
    },
    {
      // a=control:streamid=0
      name: "control",
      reg: /^control:(.*)/,
      format: "control:%s"
    },
    {
      // a=rtcp:65179 IN IP4 193.84.77.194
      name: "rtcp",
      reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
      names: ["port", "netType", "ipVer", "address"],
      format: function(i) {
        return i.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
      }
    },
    {
      // a=rtcp-fb:98 trr-int 100
      push: "rtcpFbTrrInt",
      reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
      names: ["payload", "value"],
      format: "rtcp-fb:%s trr-int %d"
    },
    {
      // a=rtcp-fb:98 nack rpsi
      push: "rtcpFb",
      reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
      names: ["payload", "type", "subtype"],
      format: function(i) {
        return i.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
      }
    },
    {
      // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      // a=extmap:1/recvonly URI-gps-string
      // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
      push: "ext",
      reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
      names: ["value", "direction", "encrypt-uri", "uri", "config"],
      format: function(i) {
        return "extmap:%d" + (i.direction ? "/%s" : "%v") + (i["encrypt-uri"] ? " %s" : "%v") + " %s" + (i.config ? " %s" : "");
      }
    },
    {
      // a=extmap-allow-mixed
      name: "extmapAllowMixed",
      reg: /^(extmap-allow-mixed)/
    },
    {
      // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
      push: "crypto",
      reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
      names: ["id", "suite", "config", "sessionConfig"],
      format: function(i) {
        return i.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
      }
    },
    {
      // a=setup:actpass
      name: "setup",
      reg: /^setup:(\w*)/,
      format: "setup:%s"
    },
    {
      // a=connection:new
      name: "connectionType",
      reg: /^connection:(new|existing)/,
      format: "connection:%s"
    },
    {
      // a=mid:1
      name: "mid",
      reg: /^mid:([^\s]*)/,
      format: "mid:%s"
    },
    {
      // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
      name: "msid",
      reg: /^msid:(.*)/,
      format: "msid:%s"
    },
    {
      // a=ptime:20
      name: "ptime",
      reg: /^ptime:(\d*(?:\.\d*)*)/,
      format: "ptime:%d"
    },
    {
      // a=maxptime:60
      name: "maxptime",
      reg: /^maxptime:(\d*(?:\.\d*)*)/,
      format: "maxptime:%d"
    },
    {
      // a=sendrecv
      name: "direction",
      reg: /^(sendrecv|recvonly|sendonly|inactive)/
    },
    {
      // a=ice-lite
      name: "icelite",
      reg: /^(ice-lite)/
    },
    {
      // a=ice-ufrag:F7gI
      name: "iceUfrag",
      reg: /^ice-ufrag:(\S*)/,
      format: "ice-ufrag:%s"
    },
    {
      // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
      name: "icePwd",
      reg: /^ice-pwd:(\S*)/,
      format: "ice-pwd:%s"
    },
    {
      // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
      name: "fingerprint",
      reg: /^fingerprint:(\S*) (\S*)/,
      names: ["type", "hash"],
      format: "fingerprint:%s %s"
    },
    {
      // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
      // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
      // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
      push: "candidates",
      reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
      names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
      format: function(i) {
        var e = "candidate:%s %d %s %d %s %d typ %s";
        return e += i.raddr != null ? " raddr %s rport %d" : "%v%v", e += i.tcptype != null ? " tcptype %s" : "%v", i.generation != null && (e += " generation %d"), e += i["network-id"] != null ? " network-id %d" : "%v", e += i["network-cost"] != null ? " network-cost %d" : "%v", e;
      }
    },
    {
      // a=end-of-candidates (keep after the candidates line for readability)
      name: "endOfCandidates",
      reg: /^(end-of-candidates)/
    },
    {
      // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
      name: "remoteCandidates",
      reg: /^remote-candidates:(.*)/,
      format: "remote-candidates:%s"
    },
    {
      // a=ice-options:google-ice
      name: "iceOptions",
      reg: /^ice-options:(\S*)/,
      format: "ice-options:%s"
    },
    {
      // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
      push: "ssrcs",
      reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
      names: ["id", "attribute", "value"],
      format: function(i) {
        var e = "ssrc:%d";
        return i.attribute != null && (e += " %s", i.value != null && (e += ":%s")), e;
      }
    },
    {
      // a=ssrc-group:FEC 1 2
      // a=ssrc-group:FEC-FR 3004364195 1080772241
      push: "ssrcGroups",
      // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
      reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
      names: ["semantics", "ssrcs"],
      format: "ssrc-group:%s %s"
    },
    {
      // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
      name: "msidSemantic",
      reg: /^msid-semantic:\s?(\w*) (\S*)/,
      names: ["semantic", "token"],
      format: "msid-semantic: %s %s"
      // space after ':' is not accidental
    },
    {
      // a=group:BUNDLE audio video
      push: "groups",
      reg: /^group:(\w*) (.*)/,
      names: ["type", "mids"],
      format: "group:%s %s"
    },
    {
      // a=rtcp-mux
      name: "rtcpMux",
      reg: /^(rtcp-mux)/
    },
    {
      // a=rtcp-rsize
      name: "rtcpRsize",
      reg: /^(rtcp-rsize)/
    },
    {
      // a=sctpmap:5000 webrtc-datachannel 1024
      name: "sctpmap",
      reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
      names: ["sctpmapNumber", "app", "maxMessageSize"],
      format: function(i) {
        return i.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
      }
    },
    {
      // a=x-google-flag:conference
      name: "xGoogleFlag",
      reg: /^x-google-flag:([^\s]*)/,
      format: "x-google-flag:%s"
    },
    {
      // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
      push: "rids",
      reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
      names: ["id", "direction", "params"],
      format: function(i) {
        return i.params ? "rid:%s %s %s" : "rid:%s %s";
      }
    },
    {
      // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
      // a=imageattr:* send [x=800,y=640] recv *
      // a=imageattr:100 recv [x=320,y=240]
      push: "imageattrs",
      reg: new RegExp(
        // a=imageattr:97
        "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
      ),
      names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
      format: function(i) {
        return "imageattr:%s %s %s" + (i.dir2 ? " %s %s" : "");
      }
    },
    {
      // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
      // a=simulcast:recv 1;4,5 send 6;7
      name: "simulcast",
      reg: new RegExp(
        // a=simulcast:
        "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
      ),
      names: ["dir1", "list1", "dir2", "list2"],
      format: function(i) {
        return "simulcast:%s %s" + (i.dir2 ? " %s %s" : "");
      }
    },
    {
      // old simulcast draft 03 (implemented by Firefox)
      //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
      // a=simulcast: recv pt=97;98 send pt=97
      // a=simulcast: send rid=5;6;7 paused=6,7
      name: "simulcast_03",
      reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
      names: ["value"],
      format: "simulcast: %s"
    },
    {
      // a=framerate:25
      // a=framerate:29.97
      name: "framerate",
      reg: /^framerate:(\d+(?:$|\.\d+))/,
      format: "framerate:%s"
    },
    {
      // RFC4570
      // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
      name: "sourceFilter",
      reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
      names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
      format: "source-filter: %s %s %s %s %s"
    },
    {
      // a=bundle-only
      name: "bundleOnly",
      reg: /^(bundle-only)/
    },
    {
      // a=label:1
      name: "label",
      reg: /^label:(.+)/,
      format: "label:%s"
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
      name: "sctpPort",
      reg: /^sctp-port:(\d+)$/,
      format: "sctp-port:%s"
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
      name: "maxMessageSize",
      reg: /^max-message-size:(\d+)$/,
      format: "max-message-size:%s"
    },
    {
      // RFC7273
      // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
      push: "tsRefClocks",
      reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
      names: ["clksrc", "clksrcExt"],
      format: function(i) {
        return "ts-refclk:%s" + (i.clksrcExt != null ? "=%s" : "");
      }
    },
    {
      // RFC7273
      // a=mediaclk:direct=963214424
      name: "mediaClk",
      reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
      names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
      format: function(i) {
        var e = "mediaclk:";
        return e += i.id != null ? "id=%s %s" : "%v%s", e += i.mediaClockValue != null ? "=%s" : "", e += i.rateNumerator != null ? " rate=%s" : "", e += i.rateDenominator != null ? "/%s" : "", e;
      }
    },
    {
      // a=keywds:keywords
      name: "keywords",
      reg: /^keywds:(.+)$/,
      format: "keywds:%s"
    },
    {
      // a=content:main
      name: "content",
      reg: /^content:(.+)/,
      format: "content:%s"
    },
    // BFCP https://tools.ietf.org/html/rfc4583
    {
      // a=floorctrl:c-s
      name: "bfcpFloorCtrl",
      reg: /^floorctrl:(c-only|s-only|c-s)/,
      format: "floorctrl:%s"
    },
    {
      // a=confid:1
      name: "bfcpConfId",
      reg: /^confid:(\d+)/,
      format: "confid:%s"
    },
    {
      // a=userid:1
      name: "bfcpUserId",
      reg: /^userid:(\d+)/,
      format: "userid:%s"
    },
    {
      // a=floorid:1
      name: "bfcpFloorId",
      reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
      names: ["id", "mStream"],
      format: "floorid:%s mstrm:%s"
    },
    {
      // any a= that we don't understand is kept verbatim on media.invalid
      push: "invalid",
      names: ["value"]
    }
  ]
};
Object.keys(Ln).forEach(function(i) {
  var e = Ln[i];
  e.forEach(function(t) {
    t.reg || (t.reg = /(.*)/), t.format || (t.format = "%s");
  });
});
var Ir = Rr.exports;
(function(i) {
  var e = function(o) {
    return String(Number(o)) === o ? Number(o) : o;
  }, t = function(o, c, d, l) {
    if (l && !d)
      c[l] = e(o[1]);
    else
      for (var u = 0; u < d.length; u += 1)
        o[u + 1] != null && (c[d[u]] = e(o[u + 1]));
  }, n = function(o, c, d) {
    var l = o.name && o.names;
    o.push && !c[o.push] ? c[o.push] = [] : l && !c[o.name] && (c[o.name] = {});
    var u = o.push ? {} : (
      // blank object that will be pushed
      l ? c[o.name] : c
    );
    t(d.match(o.reg), u, o.names, o.name), o.push && c[o.push].push(u);
  }, s = Ir, r = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
  i.parse = function(o) {
    var c = {}, d = [], l = c;
    return o.split(/(\r\n|\r|\n)/).filter(r).forEach(function(u) {
      var p = u[0], f = u.slice(2);
      p === "m" && (d.push({
        rtp: [],
        fmtp: []
      }), l = d[d.length - 1]);
      for (var b = 0; b < (s[p] || []).length; b += 1) {
        var y = s[p][b];
        if (y.reg.test(f))
          return n(y, l, f);
      }
    }), c.media = d, c;
  };
  var a = function(o, c) {
    var d = c.split(/=(.+)/, 2);
    return d.length === 2 ? o[d[0]] = e(d[1]) : d.length === 1 && c.length > 1 && (o[d[0]] = void 0), o;
  };
  i.parseParams = function(o) {
    return o.split(/;\s?/).reduce(a, {});
  }, i.parseFmtpConfig = i.parseParams, i.parsePayloads = function(o) {
    return o.toString().split(" ").map(Number);
  }, i.parseRemoteCandidates = function(o) {
    for (var c = [], d = o.split(" ").map(e), l = 0; l < d.length; l += 3)
      c.push({
        component: d[l],
        ip: d[l + 1],
        port: d[l + 2]
      });
    return c;
  }, i.parseImageAttributes = function(o) {
    return o.split(" ").map(function(c) {
      return c.substring(1, c.length - 1).split(",").reduce(a, {});
    });
  }, i.parseSimulcastStreamList = function(o) {
    return o.split(";").map(function(c) {
      return c.split(",").map(function(d) {
        var l, u = !1;
        return d[0] !== "~" ? l = e(d) : (l = e(d.substring(1, d.length)), u = !0), {
          scid: l,
          paused: u
        };
      });
    });
  };
})(Er);
var ri = Ir, kc = /%[sdv%]/g, yc = function(i) {
  var e = 1, t = arguments, n = t.length;
  return i.replace(kc, function(s) {
    if (e >= n)
      return s;
    var r = t[e];
    switch (e += 1, s) {
      case "%%":
        return "%";
      case "%s":
        return String(r);
      case "%d":
        return Number(r);
      case "%v":
        return "";
    }
  });
}, st = function(i, e, t) {
  var n = e.format instanceof Function ? e.format(e.push ? t : t[e.name]) : e.format, s = [i + "=" + n];
  if (e.names)
    for (var r = 0; r < e.names.length; r += 1) {
      var a = e.names[r];
      e.name ? s.push(t[e.name][a]) : s.push(t[e.names[r]]);
    }
  else
    s.push(t[e.name]);
  return yc.apply(null, s);
}, Tc = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"], Sc = ["i", "c", "b", "a"], Cc = function(i, e) {
  e = e || {}, i.version == null && (i.version = 0), i.name == null && (i.name = " "), i.media.forEach(function(r) {
    r.payloads == null && (r.payloads = "");
  });
  var t = e.outerOrder || Tc, n = e.innerOrder || Sc, s = [];
  return t.forEach(function(r) {
    ri[r].forEach(function(a) {
      a.name in i && i[a.name] != null ? s.push(st(r, a, i)) : a.push in i && i[a.push] != null && i[a.push].forEach(function(o) {
        s.push(st(r, a, o));
      });
    });
  }), i.media.forEach(function(r) {
    s.push(st("m", ri.m[0], r)), n.forEach(function(a) {
      ri[a].forEach(function(o) {
        o.name in r && r[o.name] != null ? s.push(st(a, o, r)) : o.push in r && r[o.push] != null && r[o.push].forEach(function(c) {
          s.push(st(a, o, c));
        });
      });
    });
  }), s.join(`\r
`) + `\r
`;
}, Le = Er, Pc = Cc, ai = Pc, ot = Le.parse;
Le.parseParams;
Le.parseFmtpConfig;
Le.parsePayloads;
Le.parseRemoteCandidates;
Le.parseImageAttributes;
Le.parseSimulcastStreamList;
const wc = 0.7, ze = {
  NegotiationStarted: "negotiationStarted",
  NegotiationComplete: "negotiationComplete",
  RTPVideoPayloadTypes: "rtpVideoPayloadTypes"
};
class An extends Pe.EventEmitter {
  constructor(e) {
    var t;
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), this.log = I, this.pendingCandidates = [], this.restartingIce = !1, this.renegotiate = !1, this.trackBitrates = [], this.remoteStereoMids = [], this.remoteNackMids = [], this.negotiate = Gi(async (s) => {
      this.emit(ze.NegotiationStarted);
      try {
        await this.createAndSendOffer();
      } catch (r) {
        if (s)
          s(r);
        else
          throw r;
      }
    }, 100), this.close = () => {
      this._pc && (this._pc.close(), this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc.onicegatheringstatechange = null, this._pc.ondatachannel = null, this._pc.onnegotiationneeded = null, this._pc.onsignalingstatechange = null, this._pc.onicecandidate = null, this._pc.ondatachannel = null, this._pc.ontrack = null, this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc = null);
    }, this.log = ve((t = n.loggerName) !== null && t !== void 0 ? t : de.PCTransport), this.loggerOptions = n, this.config = e, this._pc = this.createPC();
  }
  get pc() {
    return this._pc || (this._pc = this.createPC()), this._pc;
  }
  createPC() {
    const e = new RTCPeerConnection(this.config);
    return e.onicecandidate = (t) => {
      var n;
      t.candidate && ((n = this.onIceCandidate) === null || n === void 0 || n.call(this, t.candidate));
    }, e.onicecandidateerror = (t) => {
      var n;
      (n = this.onIceCandidateError) === null || n === void 0 || n.call(this, t);
    }, e.oniceconnectionstatechange = () => {
      var t;
      (t = this.onIceConnectionStateChange) === null || t === void 0 || t.call(this, e.iceConnectionState);
    }, e.onsignalingstatechange = () => {
      var t;
      (t = this.onSignalingStatechange) === null || t === void 0 || t.call(this, e.signalingState);
    }, e.onconnectionstatechange = () => {
      var t;
      (t = this.onConnectionStateChange) === null || t === void 0 || t.call(this, e.connectionState);
    }, e.ondatachannel = (t) => {
      var n;
      (n = this.onDataChannel) === null || n === void 0 || n.call(this, t);
    }, e.ontrack = (t) => {
      var n;
      (n = this.onTrack) === null || n === void 0 || n.call(this, t);
    }, e;
  }
  get logContext() {
    var e, t;
    return h({}, (e = (t = this.loggerOptions).loggerContextCb) === null || e === void 0 ? void 0 : e.call(t));
  }
  get isICEConnected() {
    return this._pc !== null && (this.pc.iceConnectionState === "connected" || this.pc.iceConnectionState === "completed");
  }
  async addIceCandidate(e) {
    if (this.pc.remoteDescription && !this.restartingIce)
      return this.pc.addIceCandidate(e);
    this.pendingCandidates.push(e);
  }
  async setRemoteDescription(e) {
    let t;
    if (e.type === "offer") {
      let {
        stereoMids: s,
        nackMids: r
      } = Rc(e);
      this.remoteStereoMids = s, this.remoteNackMids = r;
    } else if (e.type === "answer") {
      var n;
      const s = ot((n = e.sdp) !== null && n !== void 0 ? n : "");
      s.media.forEach((r) => {
        r.type === "audio" && this.trackBitrates.some((a) => {
          if (!a.transceiver || r.mid != a.transceiver.mid)
            return !1;
          let o = 0;
          if (r.rtp.some((d) => d.codec.toUpperCase() === a.codec.toUpperCase() ? (o = d.payload, !0) : !1), o === 0)
            return !0;
          let c = !1;
          for (const d of r.fmtp)
            if (d.payload === o) {
              d.config = d.config.split(";").filter((l) => !l.includes("maxaveragebitrate")).join(";"), a.maxbr > 0 && (d.config += ";maxaveragebitrate=".concat(a.maxbr * 1e3)), c = !0;
              break;
            }
          return c || a.maxbr > 0 && r.fmtp.push({
            payload: o,
            config: "maxaveragebitrate=".concat(a.maxbr * 1e3)
          }), !0;
        });
      }), t = ai(s);
    }
    await this.setMungedSDP(e, t, !0), this.pendingCandidates.forEach((s) => {
      this.pc.addIceCandidate(s);
    }), this.pendingCandidates = [], this.restartingIce = !1, this.renegotiate ? (this.renegotiate = !1, await this.createAndSendOffer()) : e.type === "answer" && (this.emit(ze.NegotiationComplete), e.sdp && ot(e.sdp).media.forEach((r) => {
      r.type === "video" && this.emit(ze.RTPVideoPayloadTypes, r.rtp);
    }));
  }
  async createAndSendOffer(e) {
    var t;
    if (this.onOffer === void 0)
      return;
    if (e != null && e.iceRestart && (this.log.debug("restarting ICE", this.logContext), this.restartingIce = !0), this._pc && this._pc.signalingState === "have-local-offer") {
      const r = this._pc.remoteDescription;
      if (e != null && e.iceRestart && r)
        await this._pc.setRemoteDescription(r);
      else {
        this.renegotiate = !0;
        return;
      }
    } else if (!this._pc || this._pc.signalingState === "closed") {
      this.log.warn("could not createOffer with closed peer connection", this.logContext);
      return;
    }
    this.log.debug("starting to negotiate", this.logContext);
    const n = await this.pc.createOffer(e), s = ot((t = n.sdp) !== null && t !== void 0 ? t : "");
    s.media.forEach((r) => {
      r.type === "audio" ? Nn(r, [], []) : r.type === "video" && (Ec(r), this.trackBitrates.some((a) => {
        if (!r.msid || !a.cid || !r.msid.includes(a.cid))
          return !1;
        let o = 0;
        if (r.rtp.some((d) => d.codec.toUpperCase() === a.codec.toUpperCase() ? (o = d.payload, !0) : !1), o === 0)
          return !0;
        const c = Math.round(a.maxbr * wc);
        for (const d of r.fmtp)
          if (d.payload === o) {
            d.config.includes("x-google-start-bitrate") || (d.config += ";x-google-start-bitrate=".concat(c));
            break;
          }
        return !0;
      }));
    }), await this.setMungedSDP(n, ai(s)), this.onOffer(n);
  }
  async createAndSetAnswer() {
    var e;
    const t = await this.pc.createAnswer(), n = ot((e = t.sdp) !== null && e !== void 0 ? e : "");
    return n.media.forEach((s) => {
      s.type === "audio" && Nn(s, this.remoteStereoMids, this.remoteNackMids);
    }), await this.setMungedSDP(t, ai(n)), t;
  }
  createDataChannel(e, t) {
    return this.pc.createDataChannel(e, t);
  }
  addTransceiver(e, t) {
    return this.pc.addTransceiver(e, t);
  }
  addTrack(e) {
    if (!this._pc)
      throw new K("PC closed, cannot add track");
    return this._pc.addTrack(e);
  }
  setTrackCodecBitrate(e) {
    this.trackBitrates.push(e);
  }
  setConfiguration(e) {
    var t;
    if (!this._pc)
      throw new K("PC closed, cannot configure");
    return (t = this._pc) === null || t === void 0 ? void 0 : t.setConfiguration(e);
  }
  canRemoveTrack() {
    var e;
    return !!((e = this._pc) !== null && e !== void 0 && e.removeTrack);
  }
  removeTrack(e) {
    var t;
    return (t = this._pc) === null || t === void 0 ? void 0 : t.removeTrack(e);
  }
  getConnectionState() {
    var e, t;
    return (e = (t = this._pc) === null || t === void 0 ? void 0 : t.connectionState) !== null && e !== void 0 ? e : "closed";
  }
  getICEConnectionState() {
    var e, t;
    return (e = (t = this._pc) === null || t === void 0 ? void 0 : t.iceConnectionState) !== null && e !== void 0 ? e : "closed";
  }
  getSignallingState() {
    var e, t;
    return (e = (t = this._pc) === null || t === void 0 ? void 0 : t.signalingState) !== null && e !== void 0 ? e : "closed";
  }
  getTransceivers() {
    var e, t;
    return (e = (t = this._pc) === null || t === void 0 ? void 0 : t.getTransceivers()) !== null && e !== void 0 ? e : [];
  }
  getSenders() {
    var e, t;
    return (e = (t = this._pc) === null || t === void 0 ? void 0 : t.getSenders()) !== null && e !== void 0 ? e : [];
  }
  getLocalDescription() {
    var e;
    return (e = this._pc) === null || e === void 0 ? void 0 : e.localDescription;
  }
  getRemoteDescription() {
    var e;
    return (e = this.pc) === null || e === void 0 ? void 0 : e.remoteDescription;
  }
  getStats() {
    return this.pc.getStats();
  }
  async getConnectedAddress() {
    var e;
    if (!this._pc)
      return;
    let t = "";
    const n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    if ((await this._pc.getStats()).forEach((o) => {
      switch (o.type) {
        case "transport":
          t = o.selectedCandidatePairId;
          break;
        case "candidate-pair":
          t === "" && o.selected && (t = o.id), n.set(o.id, o);
          break;
        case "remote-candidate":
          s.set(o.id, "".concat(o.address, ":").concat(o.port));
          break;
      }
    }), t === "")
      return;
    const a = (e = n.get(t)) === null || e === void 0 ? void 0 : e.remoteCandidateId;
    if (a !== void 0)
      return s.get(a);
  }
  async setMungedSDP(e, t, n) {
    if (t) {
      const s = e.sdp;
      e.sdp = t;
      try {
        this.log.debug("setting munged ".concat(n ? "remote" : "local", " description"), this.logContext), n ? await this.pc.setRemoteDescription(e) : await this.pc.setLocalDescription(e);
        return;
      } catch (r) {
        this.log.warn("not able to set ".concat(e.type, ", falling back to unmodified sdp"), h(h({}, this.logContext), {}, {
          error: r,
          sdp: t
        })), e.sdp = s;
      }
    }
    try {
      n ? await this.pc.setRemoteDescription(e) : await this.pc.setLocalDescription(e);
    } catch (s) {
      let r = "unknown error";
      s instanceof Error ? r = s.message : typeof s == "string" && (r = s);
      const a = {
        error: r,
        sdp: e.sdp
      };
      throw !n && this.pc.remoteDescription && (a.remoteSdp = this.pc.remoteDescription), this.log.error("unable to set ".concat(e.type), h(h({}, this.logContext), {}, {
        fields: a
      })), new Ci(r);
    }
  }
}
function Nn(i, e, t) {
  let n = 0;
  i.rtp.some((s) => s.codec === "opus" ? (n = s.payload, !0) : !1), n > 0 && (i.rtcpFb || (i.rtcpFb = []), t.includes(i.mid) && !i.rtcpFb.some((s) => s.payload === n && s.type === "nack") && i.rtcpFb.push({
    payload: n,
    type: "nack"
  }), e.includes(i.mid) && i.fmtp.some((s) => s.payload === n ? (s.config.includes("stereo=1") || (s.config += ";stereo=1"), !0) : !1));
}
function Ec(i) {
  var e, t;
  const n = (e = i.rtp[0]) === null || e === void 0 || (e = e.codec) === null || e === void 0 ? void 0 : e.toLowerCase();
  if (!gt(n))
    return;
  let s = 0;
  if (!((t = i.ext) === null || t === void 0 ? void 0 : t.some((o) => o.uri === wn ? !0 : (o.value > s && (s = o.value), !1)))) {
    var a;
    (a = i.ext) === null || a === void 0 || a.push({
      value: s + 1,
      uri: wn
    });
  }
}
function Rc(i) {
  var e;
  const t = [], n = [], s = ot((e = i.sdp) !== null && e !== void 0 ? e : "");
  let r = 0;
  return s.media.forEach((a) => {
    if (a.type === "audio") {
      var o;
      a.rtp.some((c) => c.codec === "opus" ? (r = c.payload, !0) : !1), (o = a.rtcpFb) !== null && o !== void 0 && o.some((c) => c.payload === r && c.type === "nack") && n.push(a.mid), a.fmtp.some((c) => c.payload === r ? (c.config.includes("sprop-stereo=1") && t.push(a.mid), !0) : !1);
    }
  }), {
    stereoMids: t,
    nackMids: n
  };
}
const Di = "vp8", Ic = {
  audioPreset: Pi.music,
  dtx: !0,
  red: !0,
  forceStereo: !1,
  simulcast: !0,
  screenShareEncoding: Jt.h1080fps15.encoding,
  stopMicTrackOnMute: !1,
  videoCodec: Di,
  backupCodec: !0
}, xc = {
  autoGainControl: !0,
  echoCancellation: !0,
  noiseSuppression: !0
}, Mc = {
  resolution: me.h720.resolution
}, Dc = {
  adaptiveStream: !1,
  dynacast: !1,
  stopLocalTrackOnUnpublish: !0,
  reconnectPolicy: new po(),
  disconnectOnPageLeave: !0,
  webAudioMix: !0
}, Ji = {
  autoSubscribe: !0,
  maxRetries: 1,
  peerConnectionTimeout: 15e3,
  websocketTimeout: 15e3
};
var X = /* @__PURE__ */ ((i) => (i[i.NEW = 0] = "NEW", i[i.CONNECTING = 1] = "CONNECTING", i[i.CONNECTED = 2] = "CONNECTED", i[i.FAILED = 3] = "FAILED", i[i.CLOSING = 4] = "CLOSING", i[i.CLOSED = 5] = "CLOSED", i))(X || {});
class _c {
  constructor(e, t, n) {
    var s;
    this.peerConnectionTimeout = Ji.peerConnectionTimeout, this.log = I, this.updateState = () => {
      const r = this.state, a = this.requiredTransports.map((c) => c.getConnectionState());
      if (a.every((c) => c === "connected") ? this.state = 2 : a.some((c) => c === "failed") ? this.state = 3 : a.some((c) => c === "connecting") ? this.state = 1 : a.every((c) => c === "closed") ? this.state = 5 : a.some((c) => c === "closed") ? this.state = 4 : a.every((c) => c === "new") && (this.state = 0), r !== this.state) {
        var o;
        this.log.debug("pc state change: from ".concat(X[r], " to ").concat(X[this.state]), this.logContext), (o = this.onStateChange) === null || o === void 0 || o.call(this, this.state, this.publisher.getConnectionState(), this.subscriber.getConnectionState());
      }
    }, this.log = ve((s = n.loggerName) !== null && s !== void 0 ? s : de.PCManager), this.loggerOptions = n, this.isPublisherConnectionRequired = !t, this.isSubscriberConnectionRequired = t, this.publisher = new An(e, n), this.subscriber = new An(e, n), this.publisher.onConnectionStateChange = this.updateState, this.subscriber.onConnectionStateChange = this.updateState, this.publisher.onIceConnectionStateChange = this.updateState, this.subscriber.onIceConnectionStateChange = this.updateState, this.publisher.onSignalingStatechange = this.updateState, this.subscriber.onSignalingStatechange = this.updateState, this.publisher.onIceCandidate = (r) => {
      var a;
      (a = this.onIceCandidate) === null || a === void 0 || a.call(this, r, ae.PUBLISHER);
    }, this.subscriber.onIceCandidate = (r) => {
      var a;
      (a = this.onIceCandidate) === null || a === void 0 || a.call(this, r, ae.SUBSCRIBER);
    }, this.subscriber.onDataChannel = (r) => {
      var a;
      (a = this.onDataChannel) === null || a === void 0 || a.call(this, r);
    }, this.subscriber.onTrack = (r) => {
      var a;
      (a = this.onTrack) === null || a === void 0 || a.call(this, r);
    }, this.publisher.onOffer = (r) => {
      var a;
      (a = this.onPublisherOffer) === null || a === void 0 || a.call(this, r);
    }, this.state = 0, this.connectionLock = new ne();
  }
  get needsPublisher() {
    return this.isPublisherConnectionRequired;
  }
  get needsSubscriber() {
    return this.isSubscriberConnectionRequired;
  }
  get currentState() {
    return this.state;
  }
  get logContext() {
    var e, t;
    return h({}, (e = (t = this.loggerOptions).loggerContextCb) === null || e === void 0 ? void 0 : e.call(t));
  }
  requirePublisher() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.isPublisherConnectionRequired = e, this.updateState();
  }
  requireSubscriber() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.isSubscriberConnectionRequired = e, this.updateState();
  }
  createAndSendPublisherOffer(e) {
    return this.publisher.createAndSendOffer(e);
  }
  setPublisherAnswer(e) {
    return this.publisher.setRemoteDescription(e);
  }
  removeTrack(e) {
    return this.publisher.removeTrack(e);
  }
  async close() {
    if (this.publisher && this.publisher.getSignallingState() !== "closed") {
      const e = this.publisher;
      for (const t of e.getSenders())
        try {
          e.canRemoveTrack() && e.removeTrack(t);
        } catch (n) {
          this.log.warn("could not removeTrack", h(h({}, this.logContext), {}, {
            error: n
          }));
        }
    }
    await Promise.all([this.publisher.close(), this.subscriber.close()]), this.updateState();
  }
  async triggerIceRestart() {
    this.subscriber.restartingIce = !0, this.needsPublisher && await this.createAndSendPublisherOffer({
      iceRestart: !0
    });
  }
  async addIceCandidate(e, t) {
    t === ae.PUBLISHER ? await this.publisher.addIceCandidate(e) : await this.subscriber.addIceCandidate(e);
  }
  async createSubscriberAnswerFromOffer(e) {
    return this.log.debug("received server offer", h(h({}, this.logContext), {}, {
      RTCSdpType: e.type,
      sdp: e.sdp,
      signalingState: this.subscriber.getSignallingState().toString()
    })), await this.subscriber.setRemoteDescription(e), await this.subscriber.createAndSetAnswer();
  }
  updateConfiguration(e, t) {
    this.publisher.setConfiguration(e), this.subscriber.setConfiguration(e), t && this.triggerIceRestart();
  }
  async ensurePCTransportConnection(e, t) {
    const n = await this.connectionLock.lock();
    try {
      var s;
      this.isPublisherConnectionRequired && this.publisher.getConnectionState() !== "connected" && this.publisher.getConnectionState() !== "connecting" && (this.log.debug("negotiation required, start negotiating", this.logContext), this.publisher.negotiate()), await Promise.all((s = this.requiredTransports) === null || s === void 0 ? void 0 : s.map((r) => this.ensureTransportConnected(r, e, t)));
    } finally {
      n();
    }
  }
  async negotiate(e) {
    return new Promise(async (t, n) => {
      const s = setTimeout(() => {
        n("negotiation timed out");
      }, this.peerConnectionTimeout), r = () => {
        clearTimeout(s), n("negotiation aborted");
      };
      e.signal.addEventListener("abort", r), this.publisher.once(ze.NegotiationStarted, () => {
        e.signal.aborted || this.publisher.once(ze.NegotiationComplete, () => {
          clearTimeout(s), t();
        });
      }), await this.publisher.negotiate((a) => {
        clearTimeout(s), n(a);
      });
    });
  }
  addPublisherTransceiver(e, t) {
    return this.publisher.addTransceiver(e, t);
  }
  addPublisherTrack(e) {
    return this.publisher.addTrack(e);
  }
  createPublisherDataChannel(e, t) {
    return this.publisher.createDataChannel(e, t);
  }
  /**
   * Returns the first required transport's address if no explicit target is specified
   */
  getConnectedAddress(e) {
    return e === ae.PUBLISHER ? this.publisher.getConnectedAddress() : e === ae.SUBSCRIBER ? this.publisher.getConnectedAddress() : this.requiredTransports[0].getConnectedAddress();
  }
  get requiredTransports() {
    const e = [];
    return this.isPublisherConnectionRequired && e.push(this.publisher), this.isSubscriberConnectionRequired && e.push(this.subscriber), e;
  }
  async ensureTransportConnected(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.peerConnectionTimeout;
    if (e.getConnectionState() !== "connected")
      return new Promise(async (r, a) => {
        const o = () => {
          this.log.warn("abort transport connection", this.logContext), Y.clearTimeout(c), a(new L("room connection has been cancelled", J.Cancelled));
        };
        t != null && t.signal.aborted && o(), t == null || t.signal.addEventListener("abort", o);
        const c = Y.setTimeout(() => {
          t == null || t.signal.removeEventListener("abort", o), a(new L("could not establish pc connection"));
        }, n);
        for (; this.state !== 2; )
          if (await ge(50), t != null && t.signal.aborted) {
            a(new L("room connection has been cancelled", J.Cancelled));
            return;
          }
        Y.clearTimeout(c), t == null || t.signal.removeEventListener("abort", o), r();
      });
  }
}
const Qi = 2e3;
function Qt(i, e) {
  if (!e)
    return 0;
  let t, n;
  return "bytesReceived" in i ? (t = i.bytesReceived, n = e.bytesReceived) : "bytesSent" in i && (t = i.bytesSent, n = e.bytesSent), t === void 0 || n === void 0 || i.timestamp === void 0 || e.timestamp === void 0 ? 0 : (t - n) * 8 * 1e3 / (i.timestamp - e.timestamp);
}
class W extends bt {
  /**
   *
   * @param mediaTrack
   * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
   * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
   */
  constructor(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, s = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 ? arguments[4] : void 0;
    super(e, v.Kind.Audio, t, n, r), this.stopOnMute = !1, this.isKrispNoiseFilterEnabled = !1, this.monitorSender = async () => {
      if (!this.sender) {
        this._currentBitrate = 0;
        return;
      }
      let a;
      try {
        a = await this.getSenderStats();
      } catch (o) {
        this.log.error("could not get audio sender stats", h(h({}, this.logContext), {}, {
          error: o
        }));
        return;
      }
      a && this.prevStats && (this._currentBitrate = Qt(a, this.prevStats)), this.prevStats = a;
    }, this.handleKrispNoiseFilterEnable = () => {
      this.isKrispNoiseFilterEnabled = !0, this.log.debug("Krisp noise filter enabled", this.logContext), this.emit(T.AudioTrackFeatureUpdate, this, ue.TF_ENHANCED_NOISE_CANCELLATION, !0);
    }, this.handleKrispNoiseFilterDisable = () => {
      this.isKrispNoiseFilterEnabled = !1, this.log.debug("Krisp noise filter disabled", this.logContext), this.emit(T.AudioTrackFeatureUpdate, this, ue.TF_ENHANCED_NOISE_CANCELLATION, !1);
    }, this.audioContext = s, this.checkForSilence();
  }
  /**
   * boolean indicating whether enhanced noise cancellation is currently being used on this track
   */
  get enhancedNoiseCancellation() {
    return this.isKrispNoiseFilterEnabled;
  }
  async setDeviceId(e) {
    return this._constraints.deviceId === e && this._mediaStreamTrack.getSettings().deviceId === Te(e) ? !0 : (this._constraints.deviceId = e, this.isMuted || await this.restartTrack(), this.isMuted || Te(e) === this._mediaStreamTrack.getSettings().deviceId);
  }
  async mute() {
    const e = await this.muteLock.lock();
    try {
      return this.isMuted ? (this.log.debug("Track already muted", this.logContext), this) : (this.source === v.Source.Microphone && this.stopOnMute && !this.isUserProvided && (this.log.debug("stopping mic track", this.logContext), this._mediaStreamTrack.stop()), await super.mute(), this);
    } finally {
      e();
    }
  }
  async unmute() {
    const e = await this.muteLock.lock();
    try {
      if (!this.isMuted)
        return this.log.debug("Track already unmuted", this.logContext), this;
      const t = this._constraints.deviceId && this._mediaStreamTrack.getSettings().deviceId !== Te(this._constraints.deviceId);
      return this.source === v.Source.Microphone && (this.stopOnMute || this._mediaStreamTrack.readyState === "ended" || t) && !this.isUserProvided && (this.log.debug("reacquiring mic track", this.logContext), await this.restartTrack()), await super.unmute(), this;
    } finally {
      e();
    }
  }
  async restartTrack(e) {
    let t;
    if (e) {
      const n = Hi({
        audio: e
      });
      typeof n.audio != "boolean" && (t = n.audio);
    }
    await this.restart(t);
  }
  async restart(e) {
    const t = await super.restart(e);
    return this.checkForSilence(), t;
  }
  /* @internal */
  startMonitor() {
    ee() && (this.monitorInterval || (this.monitorInterval = setInterval(() => {
      this.monitorSender();
    }, Qi)));
  }
  async setProcessor(e) {
    const t = await this.processorLock.lock();
    try {
      if (!this.audioContext)
        throw Error("Audio context needs to be set on LocalAudioTrack in order to enable processors");
      this.processor && await this.stopProcessor();
      const s = {
        kind: this.kind,
        track: this._mediaStreamTrack,
        audioContext: this.audioContext
      };
      if (this.log.debug("setting up audio processor ".concat(e.name), this.logContext), await e.init(s), this.processor = e, this.processor.processedTrack) {
        var n;
        await ((n = this.sender) === null || n === void 0 ? void 0 : n.replaceTrack(this.processor.processedTrack)), this.processor.processedTrack.addEventListener("enable-lk-krisp-noise-filter", this.handleKrispNoiseFilterEnable), this.processor.processedTrack.addEventListener("disable-lk-krisp-noise-filter", this.handleKrispNoiseFilterDisable);
      }
      this.emit(T.TrackProcessorUpdate, this.processor);
    } finally {
      t();
    }
  }
  /**
   * @internal
   * @experimental
   */
  setAudioContext(e) {
    this.audioContext = e;
  }
  async getSenderStats() {
    var e;
    if (!((e = this.sender) !== null && e !== void 0 && e.getStats))
      return;
    const t = await this.sender.getStats();
    let n;
    return t.forEach((s) => {
      s.type === "outbound-rtp" && (n = {
        type: "audio",
        streamId: s.id,
        packetsSent: s.packetsSent,
        packetsLost: s.packetsLost,
        bytesSent: s.bytesSent,
        timestamp: s.timestamp,
        roundTripTime: s.roundTripTime,
        jitter: s.jitter
      });
    }), n;
  }
  async checkForSilence() {
    const e = await Yo(this);
    return e && (this.isMuted || this.log.warn("silence detected on local audio track", this.logContext), this.emit(T.AudioSilenceDetected)), e;
  }
}
function Lc(i, e, t) {
  switch (i.kind) {
    case "audio":
      return new W(i, e, !1, void 0, t);
    case "video":
      return new Z(i, e, !1, t);
    default:
      throw new ce("unsupported track type: ".concat(i.kind));
  }
}
const Ac = Object.values(me), Nc = Object.values(wi), Oc = Object.values(Jt), Uc = [me.h180, me.h360], Fc = [wi.h180, wi.h360], Bc = (i) => [{
  scaleResolutionDownBy: 2,
  fps: i.encoding.maxFramerate
}].map((t) => {
  var n, s;
  return new x(Math.floor(i.width / t.scaleResolutionDownBy), Math.floor(i.height / t.scaleResolutionDownBy), Math.max(15e4, Math.floor(i.encoding.maxBitrate / (t.scaleResolutionDownBy ** 2 * (((n = i.encoding.maxFramerate) !== null && n !== void 0 ? n : 30) / ((s = t.fps) !== null && s !== void 0 ? s : 30))))), t.fps, i.encoding.priority);
}), _i = ["q", "h", "f"];
function Li(i, e, t, n) {
  let s = n == null ? void 0 : n.videoEncoding;
  i && (s = n == null ? void 0 : n.screenShareEncoding);
  const r = n == null ? void 0 : n.simulcast, a = n == null ? void 0 : n.scalabilityMode, o = n == null ? void 0 : n.videoCodec;
  if (!s && !r && !a || !e || !t)
    return [{}];
  s || (s = qc(i, e, t, o), I.debug("using video encoding", s));
  const c = new x(e, t, s.maxBitrate, s.maxFramerate, s.priority);
  if (a && gt(o)) {
    const f = new xr(a), b = [];
    if (f.spatial > 3)
      throw new Error("unsupported scalabilityMode: ".concat(a));
    const y = be();
    if (De() || (y == null ? void 0 : y.name) === "Chrome" && vt(y == null ? void 0 : y.version, "113") < 0) {
      const w = f.suffix == "h" ? 2 : 3;
      for (let S = 0; S < f.spatial; S += 1)
        b.push({
          rid: _i[2 - S],
          maxBitrate: s.maxBitrate / w ** S,
          maxFramerate: c.encoding.maxFramerate
        });
      b[0].scalabilityMode = a;
    } else
      b.push({
        maxBitrate: s.maxBitrate,
        maxFramerate: c.encoding.maxFramerate,
        /* @ts-ignore */
        scalabilityMode: a
      });
    return I.debug("using svc encoding", {
      encodings: b
    }), b;
  }
  if (!r)
    return [s];
  let d = [];
  if (i) {
    var l;
    d = (l = Un(n == null ? void 0 : n.screenShareSimulcastLayers)) !== null && l !== void 0 ? l : On(i, c);
  } else {
    var u;
    d = (u = Un(n == null ? void 0 : n.videoSimulcastLayers)) !== null && u !== void 0 ? u : On(i, c);
  }
  let p;
  if (d.length > 0) {
    const f = d[0];
    d.length > 1 && ([, p] = d);
    const b = Math.max(e, t);
    if (b >= 960 && p)
      return oi(e, t, [f, p, c]);
    if (b >= 480)
      return oi(e, t, [f, c]);
  }
  return oi(e, t, [c]);
}
function Vc(i, e, t) {
  var n, s, r, a;
  if (!t.backupCodec || t.backupCodec === !0 || t.backupCodec.codec === t.videoCodec)
    return;
  e !== t.backupCodec.codec && I.warn("requested a different codec than specified as backup", {
    serverRequested: e,
    backup: t.backupCodec.codec
  }), t.videoCodec = e, t.videoEncoding = t.backupCodec.encoding;
  const o = i.mediaStreamTrack.getSettings(), c = (n = o.width) !== null && n !== void 0 ? n : (s = i.dimensions) === null || s === void 0 ? void 0 : s.width, d = (r = o.height) !== null && r !== void 0 ? r : (a = i.dimensions) === null || a === void 0 ? void 0 : a.height;
  return Li(i.source === v.Source.ScreenShare, c, d, t);
}
function qc(i, e, t, n) {
  const s = Kc(i, e, t);
  let {
    encoding: r
  } = s[0];
  const a = Math.max(e, t);
  for (let o = 0; o < s.length; o += 1) {
    const c = s[o];
    if (r = c.encoding, c.width >= a)
      break;
  }
  if (n)
    switch (n) {
      case "av1":
        r = h({}, r), r.maxBitrate = r.maxBitrate * 0.7;
        break;
      case "vp9":
        r = h({}, r), r.maxBitrate = r.maxBitrate * 0.85;
        break;
    }
  return r;
}
function Kc(i, e, t) {
  if (i)
    return Oc;
  const n = e > t ? e / t : t / e;
  return Math.abs(n - 16 / 9) < Math.abs(n - 4 / 3) ? Ac : Nc;
}
function On(i, e) {
  if (i)
    return Bc(e);
  const {
    width: t,
    height: n
  } = e, s = t > n ? t / n : n / t;
  return Math.abs(s - 16 / 9) < Math.abs(s - 4 / 3) ? Uc : Fc;
}
function oi(i, e, t) {
  const n = [];
  if (t.forEach((s, r) => {
    if (r >= _i.length)
      return;
    const a = Math.min(i, e), c = {
      rid: _i[r],
      scaleResolutionDownBy: Math.max(1, a / Math.min(s.width, s.height)),
      maxBitrate: s.encoding.maxBitrate
    };
    s.encoding.maxFramerate && (c.maxFramerate = s.encoding.maxFramerate);
    const d = Qe() || r === 0;
    s.encoding.priority && d && (c.priority = s.encoding.priority, c.networkPriority = s.encoding.priority), n.push(c);
  }), Ce() && Pr() === "ios") {
    let s;
    n.forEach((a) => {
      s ? a.maxFramerate && a.maxFramerate > s && (s = a.maxFramerate) : s = a.maxFramerate;
    });
    let r = !0;
    n.forEach((a) => {
      if (a.maxFramerate != s) {
        var o;
        r && (r = !1, I.info("Simulcast on iOS React-Native requires all encodings to share the same framerate.")), I.info('Setting framerate of encoding "'.concat((o = a.rid) !== null && o !== void 0 ? o : "", '" to ').concat(s)), a.maxFramerate = s;
      }
    });
  }
  return n;
}
function Un(i) {
  if (i)
    return i.sort((e, t) => {
      const {
        encoding: n
      } = e, {
        encoding: s
      } = t;
      return n.maxBitrate > s.maxBitrate ? 1 : n.maxBitrate < s.maxBitrate ? -1 : n.maxBitrate === s.maxBitrate && n.maxFramerate && s.maxFramerate ? n.maxFramerate > s.maxFramerate ? 1 : -1 : 0;
    });
}
class xr {
  constructor(e) {
    const t = e.match(/^L(\d)T(\d)(h|_KEY|_KEY_SHIFT){0,1}$/);
    if (!t)
      throw new Error("invalid scalability mode");
    if (this.spatial = parseInt(t[1]), this.temporal = parseInt(t[2]), t.length > 3)
      switch (t[3]) {
        case "h":
        case "_KEY":
        case "_KEY_SHIFT":
          this.suffix = t[3];
      }
  }
  toString() {
    var e;
    return "L".concat(this.spatial, "T").concat(this.temporal).concat((e = this.suffix) !== null && e !== void 0 ? e : "");
  }
}
const jc = 5e3;
class Z extends bt {
  /**
   *
   * @param mediaTrack
   * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
   * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
   */
  constructor(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, s = arguments.length > 3 ? arguments[3] : void 0;
    super(e, v.Kind.Video, t, n, s), this.simulcastCodecs = /* @__PURE__ */ new Map(), this.monitorSender = async () => {
      if (!this.sender) {
        this._currentBitrate = 0;
        return;
      }
      let r;
      try {
        r = await this.getSenderStats();
      } catch (o) {
        this.log.error("could not get audio sender stats", h(h({}, this.logContext), {}, {
          error: o
        }));
        return;
      }
      const a = new Map(r.map((o) => [o.rid, o]));
      if (this.prevStats) {
        let o = 0;
        a.forEach((c, d) => {
          var l;
          const u = (l = this.prevStats) === null || l === void 0 ? void 0 : l.get(d);
          o += Qt(c, u);
        }), this._currentBitrate = o;
      }
      this.prevStats = a;
    }, this.senderLock = new ne();
  }
  get isSimulcast() {
    return !!(this.sender && this.sender.getParameters().encodings.length > 1);
  }
  /* @internal */
  startMonitor(e) {
    var t;
    if (this.signalClient = e, !ee())
      return;
    const n = (t = this.sender) === null || t === void 0 ? void 0 : t.getParameters();
    n && (this.encodings = n.encodings), !this.monitorInterval && (this.monitorInterval = setInterval(() => {
      this.monitorSender();
    }, Qi));
  }
  stop() {
    this._mediaStreamTrack.getConstraints(), this.simulcastCodecs.forEach((e) => {
      e.mediaStreamTrack.stop();
    }), super.stop();
  }
  async pauseUpstream() {
    await super.pauseUpstream();
    var e = !1, t = !1, n;
    try {
      for (var s = Fe(this.simulcastCodecs.values()), r; e = !(r = await s.next()).done; e = !1) {
        const o = r.value;
        {
          var a;
          await ((a = o.sender) === null || a === void 0 ? void 0 : a.replaceTrack(null));
        }
      }
    } catch (o) {
      t = !0, n = o;
    } finally {
      try {
        e && s.return != null && await s.return();
      } finally {
        if (t)
          throw n;
      }
    }
  }
  async resumeUpstream() {
    await super.resumeUpstream();
    var e = !1, t = !1, n;
    try {
      for (var s = Fe(this.simulcastCodecs.values()), r; e = !(r = await s.next()).done; e = !1) {
        const o = r.value;
        {
          var a;
          await ((a = o.sender) === null || a === void 0 ? void 0 : a.replaceTrack(o.mediaStreamTrack));
        }
      }
    } catch (o) {
      t = !0, n = o;
    } finally {
      try {
        e && s.return != null && await s.return();
      } finally {
        if (t)
          throw n;
      }
    }
  }
  async mute() {
    const e = await this.muteLock.lock();
    try {
      return this.isMuted ? (this.log.debug("Track already muted", this.logContext), this) : (this.source === v.Source.Camera && !this.isUserProvided && (this.log.debug("stopping camera track", this.logContext), this._mediaStreamTrack.stop()), await super.mute(), this);
    } finally {
      e();
    }
  }
  async unmute() {
    const e = await this.muteLock.lock();
    try {
      return this.isMuted ? (this.source === v.Source.Camera && !this.isUserProvided && (this.log.debug("reacquiring camera track", this.logContext), await this.restartTrack()), await super.unmute(), this) : (this.log.debug("Track already unmuted", this.logContext), this);
    } finally {
      e();
    }
  }
  setTrackMuted(e) {
    super.setTrackMuted(e);
    for (const t of this.simulcastCodecs.values())
      t.mediaStreamTrack.enabled = !e;
  }
  async getSenderStats() {
    var e;
    if (!((e = this.sender) !== null && e !== void 0 && e.getStats))
      return [];
    const t = [], n = await this.sender.getStats();
    return n.forEach((s) => {
      if (s.type === "outbound-rtp") {
        var r;
        const a = {
          type: "video",
          streamId: s.id,
          frameHeight: s.frameHeight,
          frameWidth: s.frameWidth,
          framesPerSecond: s.framesPerSecond,
          framesSent: s.framesSent,
          firCount: s.firCount,
          pliCount: s.pliCount,
          nackCount: s.nackCount,
          packetsSent: s.packetsSent,
          bytesSent: s.bytesSent,
          qualityLimitationReason: s.qualityLimitationReason,
          qualityLimitationDurations: s.qualityLimitationDurations,
          qualityLimitationResolutionChanges: s.qualityLimitationResolutionChanges,
          rid: (r = s.rid) !== null && r !== void 0 ? r : s.id,
          retransmittedPacketsSent: s.retransmittedPacketsSent,
          targetBitrate: s.targetBitrate,
          timestamp: s.timestamp
        }, o = n.get(s.remoteId);
        o && (a.jitter = o.jitter, a.packetsLost = o.packetsLost, a.roundTripTime = o.roundTripTime), t.push(a);
      }
    }), t.sort((s, r) => {
      var a, o;
      return ((a = r.frameWidth) !== null && a !== void 0 ? a : 0) - ((o = s.frameWidth) !== null && o !== void 0 ? o : 0);
    }), t;
  }
  setPublishingQuality(e) {
    const t = [];
    for (let n = Q.LOW; n <= Q.HIGH; n += 1)
      t.push(new Vi({
        quality: n,
        enabled: n <= e
      }));
    this.log.debug("setting publishing quality. max quality ".concat(e), this.logContext), this.setPublishingLayers(t);
  }
  async setDeviceId(e) {
    return this._constraints.deviceId === e && this._mediaStreamTrack.getSettings().deviceId === Te(e) ? !0 : (this._constraints.deviceId = e, this.isMuted || await this.restartTrack(), this.isMuted || Te(e) === this._mediaStreamTrack.getSettings().deviceId);
  }
  async restartTrack(e) {
    let t;
    if (e) {
      const c = Hi({
        video: e
      });
      typeof c.video != "boolean" && (t = c.video);
    }
    await this.restart(t);
    var n = !1, s = !1, r;
    try {
      for (var a = Fe(this.simulcastCodecs.values()), o; n = !(o = await a.next()).done; n = !1) {
        const c = o.value;
        c.sender && (c.mediaStreamTrack = this.mediaStreamTrack.clone(), await c.sender.replaceTrack(c.mediaStreamTrack));
      }
    } catch (c) {
      s = !0, r = c;
    } finally {
      try {
        n && a.return != null && await a.return();
      } finally {
        if (s)
          throw r;
      }
    }
  }
  async setProcessor(e) {
    var t;
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    if (await super.setProcessor(e, n), (t = this.processor) !== null && t !== void 0 && t.processedTrack) {
      var s = !1, r = !1, a;
      try {
        for (var o = Fe(this.simulcastCodecs.values()), c; s = !(c = await o.next()).done; s = !1) {
          const l = c.value;
          {
            var d;
            await ((d = l.sender) === null || d === void 0 ? void 0 : d.replaceTrack(this.processor.processedTrack));
          }
        }
      } catch (l) {
        r = !0, a = l;
      } finally {
        try {
          s && o.return != null && await o.return();
        } finally {
          if (r)
            throw a;
        }
      }
    }
  }
  addSimulcastTrack(e, t) {
    if (this.simulcastCodecs.has(e)) {
      this.log.error("".concat(e, " already added, skipping adding simulcast codec"), this.logContext);
      return;
    }
    const n = {
      codec: e,
      mediaStreamTrack: this.mediaStreamTrack.clone(),
      sender: void 0,
      encodings: t
    };
    return this.simulcastCodecs.set(e, n), n;
  }
  setSimulcastTrackSender(e, t) {
    const n = this.simulcastCodecs.get(e);
    n && (n.sender = t, setTimeout(() => {
      this.subscribedCodecs && this.setPublishingCodecs(this.subscribedCodecs);
    }, jc));
  }
  /**
   * @internal
   * Sets codecs that should be publishing, returns new codecs that have not yet
   * been published
   */
  async setPublishingCodecs(e) {
    if (this.log.debug("setting publishing codecs", h(h({}, this.logContext), {}, {
      codecs: e,
      currentCodec: this.codec
    })), !this.codec && e.length > 0)
      return await this.setPublishingLayers(e[0].qualities), [];
    this.subscribedCodecs = e;
    const t = [];
    var n = !1, s = !1, r;
    try {
      for (var a = Fe(e), o; n = !(o = await a.next()).done; n = !1) {
        const c = o.value;
        if (!this.codec || this.codec === c.codec)
          await this.setPublishingLayers(c.qualities);
        else {
          const d = this.simulcastCodecs.get(c.codec);
          if (this.log.debug("try setPublishingCodec for ".concat(c.codec), h(h({}, this.logContext), {}, {
            simulcastCodecInfo: d
          })), !d || !d.sender) {
            for (const l of c.qualities)
              if (l.enabled) {
                t.push(c.codec);
                break;
              }
          } else
            d.encodings && (this.log.debug("try setPublishingLayersForSender ".concat(c.codec), this.logContext), await Fn(d.sender, d.encodings, c.qualities, this.senderLock, this.log, this.logContext));
        }
      }
    } catch (c) {
      s = !0, r = c;
    } finally {
      try {
        n && a.return != null && await a.return();
      } finally {
        if (s)
          throw r;
      }
    }
    return t;
  }
  /**
   * @internal
   * Sets layers that should be publishing
   */
  async setPublishingLayers(e) {
    this.log.debug("setting publishing layers", h(h({}, this.logContext), {}, {
      qualities: e
    })), !(!this.sender || !this.encodings) && await Fn(this.sender, this.encodings, e, this.senderLock, this.log, this.logContext);
  }
  async handleAppVisibilityChanged() {
    await super.handleAppVisibilityChanged(), Sr() && this.isInBackground && this.source === v.Source.Camera && (this._mediaStreamTrack.enabled = !1);
  }
}
async function Fn(i, e, t, n, s, r) {
  const a = await n.lock();
  s.debug("setPublishingLayersForSender", h(h({}, r), {}, {
    sender: i,
    qualities: t,
    senderEncodings: e
  }));
  try {
    const o = i.getParameters(), {
      encodings: c
    } = o;
    if (!c)
      return;
    if (c.length !== e.length) {
      s.warn("cannot set publishing layers, encodings mismatch", h(h({}, r), {}, {
        encodings: c,
        senderEncodings: e
      }));
      return;
    }
    let d = !1;
    !1 && c[0].scalabilityMode || c.forEach((u, p) => {
      var f;
      let b = (f = u.rid) !== null && f !== void 0 ? f : "";
      b === "" && (b = "q");
      const y = Mr(b), w = t.find((S) => S.quality === y);
      w && u.active !== w.enabled && (d = !0, u.active = w.enabled, s.debug("setting layer ".concat(w.quality, " to ").concat(u.active ? "enabled" : "disabled"), r), Qe() && (w.enabled ? (u.scaleResolutionDownBy = e[p].scaleResolutionDownBy, u.maxBitrate = e[p].maxBitrate, u.maxFrameRate = e[p].maxFrameRate) : (u.scaleResolutionDownBy = 4, u.maxBitrate = 10, u.maxFrameRate = 2)));
    }), d && (o.encodings = c, s.debug("setting encodings", h(h({}, r), {}, {
      encodings: o.encodings
    })), await i.setParameters(o));
  } finally {
    a();
  }
}
function Mr(i) {
  switch (i) {
    case "f":
      return Q.HIGH;
    case "h":
      return Q.MEDIUM;
    case "q":
      return Q.LOW;
    default:
      return Q.HIGH;
  }
}
function Bn(i, e, t, n) {
  if (!t)
    return [new Ie({
      quality: Q.HIGH,
      width: i,
      height: e,
      bitrate: 0,
      ssrc: 0
    })];
  if (n) {
    const s = t[0].scalabilityMode, r = new xr(s), a = [], o = r.suffix == "h" ? 1.5 : 2, c = r.suffix == "h" ? 2 : 3;
    for (let d = 0; d < r.spatial; d += 1)
      a.push(new Ie({
        quality: Q.HIGH - d,
        width: Math.ceil(i / o ** d),
        height: Math.ceil(e / o ** d),
        bitrate: t[0].maxBitrate ? Math.ceil(t[0].maxBitrate / c ** d) : 0,
        ssrc: 0
      }));
    return a;
  }
  return t.map((s) => {
    var r, a, o;
    const c = (r = s.scaleResolutionDownBy) !== null && r !== void 0 ? r : 1;
    let d = Mr((a = s.rid) !== null && a !== void 0 ? a : "");
    return new Ie({
      quality: d,
      width: Math.ceil(i / c),
      height: Math.ceil(e / c),
      bitrate: (o = s.maxBitrate) !== null && o !== void 0 ? o : 0,
      ssrc: 0
    });
  });
}
const Vn = "_lossy", qn = "_reliable", Gc = 2 * 1e3, Kn = "leave-reconnect";
class Hc extends Pe.EventEmitter {
  constructor(e) {
    var t;
    super(), this.options = e, this.rtcConfig = {}, this.peerConnectionTimeout = Ji.peerConnectionTimeout, this.fullReconnectOnNext = !1, this.subscriberPrimary = !1, this.pcState = 0, this._isClosed = !0, this.pendingTrackResolvers = {}, this.reconnectAttempts = 0, this.reconnectStart = 0, this.attemptingReconnect = !1, this.joinAttempts = 0, this.maxJoinAttempts = 1, this.shouldFailNext = !1, this.log = I, this.handleDataChannel = async (n) => {
      let {
        channel: s
      } = n;
      if (s) {
        if (s.label === qn)
          this.reliableDCSub = s;
        else if (s.label === Vn)
          this.lossyDCSub = s;
        else
          return;
        this.log.debug("on data channel ".concat(s.id, ", ").concat(s.label), this.logContext), s.onmessage = this.handleDataMessage;
      }
    }, this.handleDataMessage = async (n) => {
      const s = await this.dataProcessLock.lock();
      try {
        var r, a;
        let o;
        if (n.data instanceof ArrayBuffer)
          o = n.data;
        else if (n.data instanceof Blob)
          o = await n.data.arrayBuffer();
        else {
          this.log.error("unsupported data type", h(h({}, this.logContext), {}, {
            data: n.data
          }));
          return;
        }
        const c = us.fromBinary(new Uint8Array(o));
        ((r = c.value) === null || r === void 0 ? void 0 : r.case) === "speaker" ? this.emit(P.ActiveSpeakersUpdate, c.value.value.speakers) : ((a = c.value) === null || a === void 0 ? void 0 : a.case) === "user" && this.emit(P.DataPacketReceived, c.value.value, c.kind);
      } finally {
        s();
      }
    }, this.handleDataError = (n) => {
      const r = n.currentTarget.maxRetransmits === 0 ? "lossy" : "reliable";
      if (n instanceof ErrorEvent && n.error) {
        const {
          error: a
        } = n.error;
        this.log.error("DataChannel error on ".concat(r, ": ").concat(n.message), h(h({}, this.logContext), {}, {
          error: a
        }));
      } else
        this.log.error("Unknown DataChannel error on ".concat(r), h(h({}, this.logContext), {}, {
          event: n
        }));
    }, this.handleBufferedAmountLow = (n) => {
      const r = n.currentTarget.maxRetransmits === 0 ? z.LOSSY : z.RELIABLE;
      this.updateAndEmitDCBufferStatus(r);
    }, this.handleDisconnect = (n, s) => {
      if (this._isClosed)
        return;
      this.log.warn("".concat(n, " disconnected"), this.logContext), this.reconnectAttempts === 0 && (this.reconnectStart = Date.now());
      const r = (c) => {
        this.log.warn("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(c, "ms. giving up"), this.logContext), this.emit(P.Disconnected), this.close();
      }, a = Date.now() - this.reconnectStart;
      let o = this.getNextRetryDelay({
        elapsedMs: a,
        retryCount: this.reconnectAttempts
      });
      if (o === null) {
        r(a);
        return;
      }
      n === Kn && (o = 0), this.log.debug("reconnecting in ".concat(o, "ms"), this.logContext), this.clearReconnectTimeout(), this.token && this.regionUrlProvider && this.regionUrlProvider.updateToken(this.token), this.reconnectTimeout = Y.setTimeout(() => this.attemptReconnect(s).finally(() => this.reconnectTimeout = void 0), o);
    }, this.waitForRestarted = () => new Promise((n, s) => {
      this.pcState === 1 && n();
      const r = () => {
        this.off(P.Disconnected, a), n();
      }, a = () => {
        this.off(P.Restarted, r), s();
      };
      this.once(P.Restarted, r), this.once(P.Disconnected, a);
    }), this.updateAndEmitDCBufferStatus = (n) => {
      const s = this.isBufferStatusLow(n);
      typeof s != "undefined" && s !== this.dcBufferStatus.get(n) && (this.dcBufferStatus.set(n, s), this.emit(P.DCBufferStatusChanged, s, n));
    }, this.isBufferStatusLow = (n) => {
      const s = this.dataChannelForKind(n);
      if (s)
        return s.bufferedAmount <= s.bufferedAmountLowThreshold;
    }, this.handleBrowserOnLine = () => {
      this.client.currentState === at.RECONNECTING && (this.clearReconnectTimeout(), this.attemptReconnect(Ne.RR_SIGNAL_DISCONNECTED));
    }, this.log = ve((t = e.loggerName) !== null && t !== void 0 ? t : de.Engine), this.loggerOptions = {
      loggerName: e.loggerName,
      loggerContextCb: () => this.logContext
    }, this.client = new vc(void 0, this.loggerOptions), this.client.signalLatency = this.options.expSignalLatency, this.reconnectPolicy = this.options.reconnectPolicy, this.registerOnLineListener(), this.closingLock = new ne(), this.dataProcessLock = new ne(), this.dcBufferStatus = /* @__PURE__ */ new Map([[z.LOSSY, !0], [z.RELIABLE, !0]]), this.client.onParticipantUpdate = (n) => this.emit(P.ParticipantUpdate, n), this.client.onConnectionQuality = (n) => this.emit(P.ConnectionQualityUpdate, n), this.client.onRoomUpdate = (n) => this.emit(P.RoomUpdate, n), this.client.onSubscriptionError = (n) => this.emit(P.SubscriptionError, n), this.client.onSubscriptionPermissionUpdate = (n) => this.emit(P.SubscriptionPermissionUpdate, n), this.client.onSpeakersChanged = (n) => this.emit(P.SpeakersChanged, n), this.client.onStreamStateUpdate = (n) => this.emit(P.StreamStateChanged, n);
  }
  get isClosed() {
    return this._isClosed;
  }
  get pendingReconnect() {
    return !!this.reconnectTimeout;
  }
  /** @internal */
  get logContext() {
    var e, t, n, s;
    return {
      room: (e = this.latestJoinResponse) === null || e === void 0 || (e = e.room) === null || e === void 0 ? void 0 : e.name,
      roomID: (t = this.latestJoinResponse) === null || t === void 0 || (t = t.room) === null || t === void 0 ? void 0 : t.sid,
      participant: (n = this.latestJoinResponse) === null || n === void 0 || (n = n.participant) === null || n === void 0 ? void 0 : n.identity,
      pID: (s = this.latestJoinResponse) === null || s === void 0 || (s = s.participant) === null || s === void 0 ? void 0 : s.sid
    };
  }
  async join(e, t, n, s) {
    this.url = e, this.token = t, this.signalOpts = n, this.maxJoinAttempts = n.maxRetries;
    try {
      this.joinAttempts += 1, this.setupSignalClientCallbacks();
      const r = await this.client.join(e, t, n, s);
      return this._isClosed = !1, this.latestJoinResponse = r, this.subscriberPrimary = r.subscriberPrimary, this.pcManager || await this.configure(r), this.subscriberPrimary || this.negotiate(), this.clientConfiguration = r.clientConfiguration, r;
    } catch (r) {
      if (r instanceof L && r.reason === J.ServerUnreachable && (this.log.warn("Couldn't connect to server, attempt ".concat(this.joinAttempts, " of ").concat(this.maxJoinAttempts), this.logContext), this.joinAttempts < this.maxJoinAttempts))
        return this.join(e, t, n, s);
      throw r;
    }
  }
  async close() {
    const e = await this.closingLock.lock();
    if (this.isClosed) {
      e();
      return;
    }
    try {
      this._isClosed = !0, this.emit(P.Closing), this.removeAllListeners(), this.deregisterOnLineListener(), this.clearPendingReconnect(), await this.cleanupPeerConnections(), await this.cleanupClient();
    } finally {
      e();
    }
  }
  async cleanupPeerConnections() {
    var e;
    await ((e = this.pcManager) === null || e === void 0 ? void 0 : e.close()), this.pcManager = void 0;
    const t = (n) => {
      n && (n.close(), n.onbufferedamountlow = null, n.onclose = null, n.onclosing = null, n.onerror = null, n.onmessage = null, n.onopen = null);
    };
    t(this.lossyDC), t(this.lossyDCSub), t(this.reliableDC), t(this.reliableDCSub), this.lossyDC = void 0, this.lossyDCSub = void 0, this.reliableDC = void 0, this.reliableDCSub = void 0;
  }
  async cleanupClient() {
    await this.client.close(), this.client.resetCallbacks();
  }
  addTrack(e) {
    if (this.pendingTrackResolvers[e.cid])
      throw new ce("a track with the same ID has already been published");
    return new Promise((t, n) => {
      const s = setTimeout(() => {
        delete this.pendingTrackResolvers[e.cid], n(new L("publication of local track timed out, no response from server"));
      }, 1e4);
      this.pendingTrackResolvers[e.cid] = {
        resolve: (r) => {
          clearTimeout(s), t(r);
        },
        reject: () => {
          clearTimeout(s), n(new Error("Cancelled publication by calling unpublish"));
        }
      }, this.client.sendAddTrack(e);
    });
  }
  /**
   * Removes sender from PeerConnection, returning true if it was removed successfully
   * and a negotiation is necessary
   * @param sender
   * @returns
   */
  removeTrack(e) {
    if (e.track && this.pendingTrackResolvers[e.track.id]) {
      const {
        reject: t
      } = this.pendingTrackResolvers[e.track.id];
      t && t(), delete this.pendingTrackResolvers[e.track.id];
    }
    try {
      return this.pcManager.removeTrack(e), !0;
    } catch (t) {
      this.log.warn("failed to remove track", h(h({}, this.logContext), {}, {
        error: t
      }));
    }
    return !1;
  }
  updateMuteStatus(e, t) {
    this.client.sendMuteTrack(e, t);
  }
  get dataSubscriberReadyState() {
    var e;
    return (e = this.reliableDCSub) === null || e === void 0 ? void 0 : e.readyState;
  }
  async getConnectedServerAddress() {
    var e;
    return (e = this.pcManager) === null || e === void 0 ? void 0 : e.getConnectedAddress();
  }
  /* @internal */
  setRegionUrlProvider(e) {
    this.regionUrlProvider = e;
  }
  async configure(e) {
    var t;
    if (this.pcManager && this.pcManager.currentState !== X.NEW)
      return;
    this.participantSid = (t = e.participant) === null || t === void 0 ? void 0 : t.sid;
    const n = this.makeRTCConfiguration(e);
    this.pcManager = new _c(n, e.subscriberPrimary, this.loggerOptions), this.emit(P.TransportsCreated, this.pcManager.publisher, this.pcManager.subscriber), this.pcManager.onIceCandidate = (s, r) => {
      this.client.sendIceCandidate(s, r);
    }, this.pcManager.onPublisherOffer = (s) => {
      this.client.sendOffer(s);
    }, this.pcManager.onDataChannel = this.handleDataChannel, this.pcManager.onStateChange = async (s, r, a) => {
      if (this.log.debug("primary PC state changed ".concat(s), this.logContext), ["closed", "disconnected", "failed"].includes(r) && (this.publisherConnectionPromise = void 0), s === X.CONNECTED) {
        const d = this.pcState === 0;
        this.pcState = 1, d && this.emit(P.Connected, e);
      } else
        s === X.FAILED && this.pcState === 1 && (this.pcState = 2, this.handleDisconnect("peerconnection failed", a === "failed" ? Ne.RR_SUBSCRIBER_FAILED : Ne.RR_PUBLISHER_FAILED));
      const o = this.client.isDisconnected || this.client.currentState === at.RECONNECTING, c = [X.FAILED, X.CLOSING, X.CLOSED].includes(s);
      o && c && !this._isClosed && this.emit(P.Offline);
    }, this.pcManager.onTrack = (s) => {
      this.emit(P.MediaTrackAdded, s.track, s.streams[0], s.receiver);
    }, this.createDataChannels();
  }
  setupSignalClientCallbacks() {
    this.client.onAnswer = async (e) => {
      this.pcManager && (this.log.debug("received server answer", h(h({}, this.logContext), {}, {
        RTCSdpType: e.type
      })), await this.pcManager.setPublisherAnswer(e));
    }, this.client.onTrickle = (e, t) => {
      this.pcManager && (this.log.trace("got ICE candidate from peer", h(h({}, this.logContext), {}, {
        candidate: e,
        target: t
      })), this.pcManager.addIceCandidate(e, t));
    }, this.client.onOffer = async (e) => {
      if (!this.pcManager)
        return;
      const t = await this.pcManager.createSubscriberAnswerFromOffer(e);
      this.client.sendAnswer(t);
    }, this.client.onLocalTrackPublished = (e) => {
      var t;
      if (this.log.debug("received trackPublishedResponse", h(h({}, this.logContext), {}, {
        cid: e.cid,
        track: (t = e.track) === null || t === void 0 ? void 0 : t.sid
      })), !this.pendingTrackResolvers[e.cid]) {
        this.log.error("missing track resolver for ".concat(e.cid), h(h({}, this.logContext), {}, {
          cid: e.cid
        }));
        return;
      }
      const {
        resolve: n
      } = this.pendingTrackResolvers[e.cid];
      delete this.pendingTrackResolvers[e.cid], n(e.track);
    }, this.client.onLocalTrackUnpublished = (e) => {
      this.emit(P.LocalTrackUnpublished, e);
    }, this.client.onTokenRefresh = (e) => {
      this.token = e;
    }, this.client.onRemoteMuteChanged = (e, t) => {
      this.emit(P.RemoteMute, e, t);
    }, this.client.onSubscribedQualityUpdate = (e) => {
      this.emit(P.SubscribedQualityUpdate, e);
    }, this.client.onClose = () => {
      this.handleDisconnect("signal", Ne.RR_SIGNAL_DISCONNECTED);
    }, this.client.onLeave = (e) => {
      e != null && e.canReconnect ? (this.fullReconnectOnNext = !0, this.handleDisconnect(Kn)) : (this.emit(P.Disconnected, e == null ? void 0 : e.reason), this.close()), this.log.debug("client leave request", h(h({}, this.logContext), {}, {
        reason: e == null ? void 0 : e.reason
      }));
    };
  }
  makeRTCConfiguration(e) {
    var t;
    const n = h({}, this.rtcConfig);
    if ((t = this.signalOpts) !== null && t !== void 0 && t.e2eeEnabled && (this.log.debug("E2EE - setting up transports with insertable streams", this.logContext), n.encodedInsertableStreams = !0), e.iceServers && !n.iceServers) {
      const s = [];
      e.iceServers.forEach((r) => {
        const a = {
          urls: r.urls
        };
        r.username && (a.username = r.username), r.credential && (a.credential = r.credential), s.push(a);
      }), n.iceServers = s;
    }
    return e.clientConfiguration && e.clientConfiguration.forceRelay === ft.ENABLED && (n.iceTransportPolicy = "relay"), n.sdpSemantics = "unified-plan", n.continualGatheringPolicy = "gather_continually", n;
  }
  createDataChannels() {
    this.pcManager && (this.lossyDC && (this.lossyDC.onmessage = null, this.lossyDC.onerror = null), this.reliableDC && (this.reliableDC.onmessage = null, this.reliableDC.onerror = null), this.lossyDC = this.pcManager.createPublisherDataChannel(Vn, {
      // will drop older packets that arrive
      ordered: !0,
      maxRetransmits: 0
    }), this.reliableDC = this.pcManager.createPublisherDataChannel(qn, {
      ordered: !0
    }), this.lossyDC.onmessage = this.handleDataMessage, this.reliableDC.onmessage = this.handleDataMessage, this.lossyDC.onerror = this.handleDataError, this.reliableDC.onerror = this.handleDataError, this.lossyDC.bufferedAmountLowThreshold = 65535, this.reliableDC.bufferedAmountLowThreshold = 65535, this.lossyDC.onbufferedamountlow = this.handleBufferedAmountLow, this.reliableDC.onbufferedamountlow = this.handleBufferedAmountLow);
  }
  async createSender(e, t, n) {
    if (Ri())
      return await this.createTransceiverRTCRtpSender(e, t, n);
    if (Ii())
      return this.log.warn("using add-track fallback", this.logContext), await this.createRTCRtpSender(e.mediaStreamTrack);
    throw new K("Required webRTC APIs not supported on this device");
  }
  async createSimulcastSender(e, t, n, s) {
    if (Ri())
      return this.createSimulcastTransceiverSender(e, t, n, s);
    if (Ii())
      return this.log.debug("using add-track fallback", this.logContext), this.createRTCRtpSender(e.mediaStreamTrack);
    throw new K("Cannot stream on this device");
  }
  async createTransceiverRTCRtpSender(e, t, n) {
    if (!this.pcManager)
      throw new K("publisher is closed");
    const s = [];
    e.mediaStream && s.push(e.mediaStream), e instanceof Z && (e.codec = t.videoCodec);
    const r = {
      direction: "sendonly",
      streams: s
    };
    return n && (r.sendEncodings = n), (await this.pcManager.addPublisherTransceiver(e.mediaStreamTrack, r)).sender;
  }
  async createSimulcastTransceiverSender(e, t, n, s) {
    if (!this.pcManager)
      throw new K("publisher is closed");
    const r = {
      direction: "sendonly"
    };
    s && (r.sendEncodings = s);
    const a = await this.pcManager.addPublisherTransceiver(t.mediaStreamTrack, r);
    if (n.videoCodec)
      return e.setSimulcastTrackSender(n.videoCodec, a.sender), a.sender;
  }
  async createRTCRtpSender(e) {
    if (!this.pcManager)
      throw new K("publisher is closed");
    return this.pcManager.addPublisherTrack(e);
  }
  async attemptReconnect(e) {
    var t, n, s;
    if (!this._isClosed) {
      if (this.attemptingReconnect) {
        I.warn("already attempting reconnect, returning early", this.logContext);
        return;
      }
      (((t = this.clientConfiguration) === null || t === void 0 ? void 0 : t.resumeConnection) === ft.DISABLED || // signaling state could change to closed due to hardware sleep
      // those connections cannot be resumed
      ((n = (s = this.pcManager) === null || s === void 0 ? void 0 : s.currentState) !== null && n !== void 0 ? n : X.NEW) === X.NEW) && (this.fullReconnectOnNext = !0);
      try {
        this.attemptingReconnect = !0, this.fullReconnectOnNext ? await this.restartConnection() : await this.resumeConnection(e), this.clearPendingReconnect(), this.fullReconnectOnNext = !1;
      } catch (r) {
        this.reconnectAttempts += 1;
        let a = !0;
        r instanceof K ? (this.log.debug("received unrecoverable error", h(h({}, this.logContext), {}, {
          error: r
        })), a = !1) : r instanceof Oe || (this.fullReconnectOnNext = !0), a ? this.handleDisconnect("reconnect", Ne.RR_UNKNOWN) : (this.log.info("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(Date.now() - this.reconnectStart, "ms. giving up"), this.logContext), this.emit(P.Disconnected), await this.close());
      } finally {
        this.attemptingReconnect = !1;
      }
    }
  }
  getNextRetryDelay(e) {
    try {
      return this.reconnectPolicy.nextRetryDelayInMs(e);
    } catch (t) {
      this.log.warn("encountered error in reconnect policy", h(h({}, this.logContext), {}, {
        error: t
      }));
    }
    return null;
  }
  async restartConnection(e) {
    try {
      var t;
      if (!this.url || !this.token)
        throw new K("could not reconnect, url or token not saved");
      this.log.info("reconnecting, attempt: ".concat(this.reconnectAttempts), this.logContext), this.emit(P.Restarting), this.client.isDisconnected || await this.client.sendLeave(), await this.cleanupPeerConnections(), await this.cleanupClient();
      let r;
      try {
        if (!this.signalOpts)
          throw this.log.warn("attempted connection restart, without signal options present", this.logContext), new Oe();
        r = await this.join(e != null ? e : this.url, this.token, this.signalOpts);
      } catch (a) {
        throw a instanceof L && a.reason === J.NotAllowed ? new K("could not reconnect, token might be expired") : new Oe();
      }
      if (this.shouldFailNext)
        throw this.shouldFailNext = !1, new Error("simulated failure");
      if (this.client.setReconnected(), this.emit(P.SignalRestarted, r), await this.waitForPCReconnected(), this.client.currentState !== at.CONNECTED)
        throw new Oe("Signal connection got severed during reconnect");
      (t = this.regionUrlProvider) === null || t === void 0 || t.resetAttempts(), this.emit(P.Restarted);
    } catch (r) {
      var n;
      const a = await ((n = this.regionUrlProvider) === null || n === void 0 ? void 0 : n.getNextBestRegionUrl());
      if (a) {
        await this.restartConnection(a);
        return;
      } else {
        var s;
        throw (s = this.regionUrlProvider) === null || s === void 0 || s.resetAttempts(), r;
      }
    }
  }
  async resumeConnection(e) {
    var t;
    if (!this.url || !this.token)
      throw new K("could not reconnect, url or token not saved");
    if (!this.pcManager)
      throw new K("publisher and subscriber connections unset");
    this.log.info("resuming signal connection, attempt ".concat(this.reconnectAttempts), this.logContext), this.emit(P.Resuming);
    let n;
    try {
      this.setupSignalClientCallbacks(), n = await this.client.reconnect(this.url, this.token, this.participantSid, e);
    } catch (s) {
      let r = "";
      throw s instanceof Error && (r = s.message, this.log.error(s.message, h(h({}, this.logContext), {}, {
        error: s
      }))), s instanceof L && s.reason === J.NotAllowed ? new K("could not reconnect, token might be expired") : s instanceof L && s.reason === J.LeaveRequest ? s : new Oe(r);
    }
    if (this.emit(P.SignalResumed), n) {
      const s = this.makeRTCConfiguration(n);
      this.pcManager.updateConfiguration(s);
    } else
      this.log.warn("Did not receive reconnect response", this.logContext);
    if (this.shouldFailNext)
      throw this.shouldFailNext = !1, new Error("simulated failure");
    if (await this.pcManager.triggerIceRestart(), await this.waitForPCReconnected(), this.client.currentState !== at.CONNECTED)
      throw new Oe("Signal connection got severed during reconnect");
    this.client.setReconnected(), ((t = this.reliableDC) === null || t === void 0 ? void 0 : t.readyState) === "open" && this.reliableDC.id === null && this.createDataChannels(), this.emit(P.Resumed);
  }
  async waitForPCInitialConnection(e, t) {
    if (!this.pcManager)
      throw new K("PC manager is closed");
    await this.pcManager.ensurePCTransportConnection(t, e);
  }
  async waitForPCReconnected() {
    this.pcState = 3, this.log.debug("waiting for peer connection to reconnect", this.logContext);
    try {
      if (await ge(Gc), !this.pcManager)
        throw new K("PC manager is closed");
      await this.pcManager.ensurePCTransportConnection(void 0, this.peerConnectionTimeout), this.pcState = 1;
    } catch (e) {
      throw this.pcState = 2, new L("could not establish PC connection, ".concat(e.message));
    }
  }
  /* @internal */
  async sendDataPacket(e, t) {
    const n = e.toBinary();
    await this.ensurePublisherConnected(t);
    const s = this.dataChannelForKind(t);
    s && s.send(n), this.updateAndEmitDCBufferStatus(t);
  }
  /**
   * @internal
   */
  async ensureDataTransportConnected(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.subscriberPrimary;
    if (!this.pcManager)
      throw new K("PC manager is closed");
    const n = t ? this.pcManager.subscriber : this.pcManager.publisher, s = t ? "Subscriber" : "Publisher";
    if (!n)
      throw new L("".concat(s, " connection not set"));
    !t && !this.pcManager.publisher.isICEConnected && this.pcManager.publisher.getICEConnectionState() !== "checking" && this.negotiate();
    const r = this.dataChannelForKind(e, t);
    if ((r == null ? void 0 : r.readyState) === "open")
      return;
    const a = (/* @__PURE__ */ new Date()).getTime() + this.peerConnectionTimeout;
    for (; (/* @__PURE__ */ new Date()).getTime() < a; ) {
      var o;
      if (n.isICEConnected && ((o = this.dataChannelForKind(e, t)) === null || o === void 0 ? void 0 : o.readyState) === "open")
        return;
      await ge(50);
    }
    throw new L("could not establish ".concat(s, " connection, state: ").concat(n.getICEConnectionState()));
  }
  async ensurePublisherConnected(e) {
    this.publisherConnectionPromise || (this.publisherConnectionPromise = this.ensureDataTransportConnected(e, !1)), await this.publisherConnectionPromise;
  }
  /* @internal */
  verifyTransport() {
    return !(!this.pcManager || this.pcManager.currentState !== X.CONNECTED || !this.client.ws || this.client.ws.readyState === WebSocket.CLOSED);
  }
  /** @internal */
  async negotiate() {
    return new Promise(async (e, t) => {
      if (!this.pcManager) {
        t(new Ci("PC manager is closed"));
        return;
      }
      this.pcManager.requirePublisher();
      const n = new AbortController(), s = () => {
        n.abort(), this.log.debug("engine disconnected while negotiation was ongoing", this.logContext), e();
      };
      this.isClosed && t("cannot negotiate on closed engine"), this.on(P.Closing, s), this.pcManager.publisher.once(ze.RTPVideoPayloadTypes, (r) => {
        const a = /* @__PURE__ */ new Map();
        r.forEach((o) => {
          const c = o.codec.toLowerCase();
          lc(c) && a.set(o.payload, c);
        }), this.emit(P.RTPVideoMapUpdate, a);
      });
      try {
        await this.pcManager.negotiate(n), e();
      } catch (r) {
        r instanceof Ci && (this.fullReconnectOnNext = !0), this.handleDisconnect("negotiation", Ne.RR_UNKNOWN), t(r);
      } finally {
        this.off(P.Closing, s);
      }
    });
  }
  dataChannelForKind(e, t) {
    if (t) {
      if (e === z.LOSSY)
        return this.lossyDCSub;
      if (e === z.RELIABLE)
        return this.reliableDCSub;
    } else {
      if (e === z.LOSSY)
        return this.lossyDC;
      if (e === z.RELIABLE)
        return this.reliableDC;
    }
  }
  /** @internal */
  sendSyncState(e, t) {
    var n, s;
    if (!this.pcManager) {
      this.log.warn("sync state cannot be sent without peer connection setup", this.logContext);
      return;
    }
    const r = this.pcManager.subscriber.getLocalDescription(), a = this.pcManager.subscriber.getRemoteDescription(), o = (n = (s = this.signalOpts) === null || s === void 0 ? void 0 : s.autoSubscribe) !== null && n !== void 0 ? n : !0, c = new Array(), d = new Array();
    e.forEach((l) => {
      l.isDesired !== o && c.push(l.trackSid), l.isEnabled || d.push(l.trackSid);
    }), this.client.sendSyncState(new ws({
      answer: r ? Kt({
        sdp: r.sdp,
        type: r.type
      }) : void 0,
      offer: a ? Kt({
        sdp: a.sdp,
        type: a.type
      }) : void 0,
      subscription: new Ht({
        trackSids: c,
        subscribe: !o,
        participantTracks: []
      }),
      publishTracks: ec(t),
      dataChannels: this.dataChannelsInfo(),
      trackSidsDisabled: d
    }));
  }
  /* @internal */
  failNext() {
    this.shouldFailNext = !0;
  }
  dataChannelsInfo() {
    const e = [], t = (n, s) => {
      (n == null ? void 0 : n.id) !== void 0 && n.id !== null && e.push(new Es({
        label: n.label,
        id: n.id,
        target: s
      }));
    };
    return t(this.dataChannelForKind(z.LOSSY), ae.PUBLISHER), t(this.dataChannelForKind(z.RELIABLE), ae.PUBLISHER), t(this.dataChannelForKind(z.LOSSY, !0), ae.SUBSCRIBER), t(this.dataChannelForKind(z.RELIABLE, !0), ae.SUBSCRIBER), e;
  }
  clearReconnectTimeout() {
    this.reconnectTimeout && Y.clearTimeout(this.reconnectTimeout);
  }
  clearPendingReconnect() {
    this.clearReconnectTimeout(), this.reconnectAttempts = 0;
  }
  registerOnLineListener() {
    ee() && window.addEventListener("online", this.handleBrowserOnLine);
  }
  deregisterOnLineListener() {
    ee() && window.removeEventListener("online", this.handleBrowserOnLine);
  }
}
class Oe extends Error {
}
class jn {
  constructor(e, t) {
    this.lastUpdateAt = 0, this.settingsCacheTime = 3e3, this.attemptedRegions = [], this.serverUrl = new URL(e), this.token = t;
  }
  updateToken(e) {
    this.token = e;
  }
  isCloud() {
    return Mi(this.serverUrl);
  }
  getServerUrl() {
    return this.serverUrl;
  }
  async getNextBestRegionUrl(e) {
    if (!this.isCloud())
      throw Error("region availability is only supported for LiveKit Cloud domains");
    (!this.regionSettings || Date.now() - this.lastUpdateAt > this.settingsCacheTime) && (this.regionSettings = await this.fetchRegionSettings(e));
    const t = this.regionSettings.regions.filter((n) => !this.attemptedRegions.find((s) => s.url === n.url));
    if (t.length > 0) {
      const n = t[0];
      return this.attemptedRegions.push(n), I.debug("next region: ".concat(n.region)), n.url;
    } else
      return null;
  }
  resetAttempts() {
    this.attemptedRegions = [];
  }
  /* @internal */
  async fetchRegionSettings(e) {
    const t = await fetch("".concat(zc(this.serverUrl), "/regions"), {
      headers: {
        authorization: "Bearer ".concat(this.token)
      },
      signal: e
    });
    if (t.ok) {
      const n = await t.json();
      return this.lastUpdateAt = Date.now(), n;
    } else
      throw new L("Could not fetch region settings: ".concat(t.statusText), t.status === 401 ? J.NotAllowed : void 0, t.status);
  }
}
function zc(i) {
  return "".concat(i.protocol.replace("ws", "http"), "//").concat(i.host, "/settings");
}
class Dr extends v {
  constructor(e, t, n, s, r) {
    super(e, n, r), this.sid = t, this.receiver = s;
  }
  /** @internal */
  setMuted(e) {
    this.isMuted !== e && (this.isMuted = e, this._mediaStreamTrack.enabled = !e, this.emit(e ? T.Muted : T.Unmuted, this));
  }
  /** @internal */
  setMediaStream(e) {
    this.mediaStream = e;
    const t = (n) => {
      n.track === this._mediaStreamTrack && (e.removeEventListener("removetrack", t), this.receiver = void 0, this._currentBitrate = 0, this.emit(T.Ended, this));
    };
    e.addEventListener("removetrack", t);
  }
  start() {
    this.startMonitor(), super.enable();
  }
  stop() {
    this.stopMonitor(), super.disable();
  }
  /**
   * Gets the RTCStatsReport for the RemoteTrack's underlying RTCRtpReceiver
   * See https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport
   *
   * @returns Promise<RTCStatsReport> | undefined
   */
  async getRTCStatsReport() {
    var e;
    return (e = this.receiver) !== null && e !== void 0 && e.getStats ? await this.receiver.getStats() : void 0;
  }
  /* @internal */
  startMonitor() {
    this.monitorInterval || (this.monitorInterval = setInterval(() => this.monitorReceiver(), Qi));
  }
}
class ht extends Dr {
  constructor(e, t, n, s, r, a) {
    super(e, t, v.Kind.Audio, n, a), this.monitorReceiver = async () => {
      if (!this.receiver) {
        this._currentBitrate = 0;
        return;
      }
      const o = await this.getReceiverStats();
      o && this.prevStats && this.receiver && (this._currentBitrate = Qt(o, this.prevStats)), this.prevStats = o;
    }, this.audioContext = s, this.webAudioPluginNodes = [], r && (this.sinkId = r.deviceId);
  }
  /**
   * sets the volume for all attached audio elements
   */
  setVolume(e) {
    for (const n of this.attachedElements)
      if (this.audioContext) {
        var t;
        (t = this.gainNode) === null || t === void 0 || t.gain.setTargetAtTime(e, 0, 0.1);
      } else
        n.volume = e;
    Ce() && this._mediaStreamTrack._setVolume(e), this.elementVolume = e;
  }
  /**
   * gets the volume of attached audio elements (loudest)
   */
  getVolume() {
    if (this.elementVolume)
      return this.elementVolume;
    if (Ce())
      return 1;
    let e = 0;
    return this.attachedElements.forEach((t) => {
      t.volume > e && (e = t.volume);
    }), e;
  }
  /**
   * calls setSinkId on all attached elements, if supported
   * @param deviceId audio output device
   */
  async setSinkId(e) {
    this.sinkId = e, await Promise.all(this.attachedElements.map((t) => {
      if (xi(t))
        return t.setSinkId(e);
    }));
  }
  attach(e) {
    const t = this.attachedElements.length === 0;
    return e ? super.attach(e) : e = super.attach(), this.sinkId && xi(e) && e.setSinkId(this.sinkId), this.audioContext && t && (this.log.debug("using audio context mapping", this.logContext), this.connectWebAudio(this.audioContext, e), e.volume = 0, e.muted = !0), this.elementVolume && this.setVolume(this.elementVolume), e;
  }
  detach(e) {
    let t;
    return e ? (t = super.detach(e), this.audioContext && (this.attachedElements.length > 0 ? this.connectWebAudio(this.audioContext, this.attachedElements[0]) : this.disconnectWebAudio())) : (t = super.detach(), this.disconnectWebAudio()), t;
  }
  /**
   * @internal
   * @experimental
   */
  setAudioContext(e) {
    this.audioContext = e, e && this.attachedElements.length > 0 ? this.connectWebAudio(e, this.attachedElements[0]) : e || this.disconnectWebAudio();
  }
  /**
   * @internal
   * @experimental
   * @param {AudioNode[]} nodes - An array of WebAudio nodes. These nodes should not be connected to each other when passed, as the sdk will take care of connecting them in the order of the array.
   */
  setWebAudioPlugins(e) {
    this.webAudioPluginNodes = e, this.attachedElements.length > 0 && this.audioContext && this.connectWebAudio(this.audioContext, this.attachedElements[0]);
  }
  connectWebAudio(e, t) {
    this.disconnectWebAudio(), this.sourceNode = e.createMediaStreamSource(t.srcObject);
    let n = this.sourceNode;
    this.webAudioPluginNodes.forEach((s) => {
      n.connect(s), n = s;
    }), this.gainNode = e.createGain(), n.connect(this.gainNode), this.gainNode.connect(e.destination), this.elementVolume && this.gainNode.gain.setTargetAtTime(this.elementVolume, 0, 0.1), e.state !== "running" && e.resume().then(() => {
      e.state !== "running" && this.emit(T.AudioPlaybackFailed, new Error("Audio Context couldn't be started automatically"));
    }).catch((s) => {
      this.emit(T.AudioPlaybackFailed, s);
    });
  }
  disconnectWebAudio() {
    var e, t;
    (e = this.gainNode) === null || e === void 0 || e.disconnect(), (t = this.sourceNode) === null || t === void 0 || t.disconnect(), this.gainNode = void 0, this.sourceNode = void 0;
  }
  async getReceiverStats() {
    if (!this.receiver || !this.receiver.getStats)
      return;
    const e = await this.receiver.getStats();
    let t;
    return e.forEach((n) => {
      n.type === "inbound-rtp" && (t = {
        type: "audio",
        timestamp: n.timestamp,
        jitter: n.jitter,
        bytesReceived: n.bytesReceived,
        concealedSamples: n.concealedSamples,
        concealmentEvents: n.concealmentEvents,
        silentConcealedSamples: n.silentConcealedSamples,
        silentConcealmentEvents: n.silentConcealmentEvents,
        totalAudioEnergy: n.totalAudioEnergy,
        totalSamplesDuration: n.totalSamplesDuration
      });
    }), t;
  }
}
const ci = 100;
class We extends Dr {
  constructor(e, t, n, s, r) {
    super(e, t, v.Kind.Video, n, r), this.elementInfos = [], this.monitorReceiver = async () => {
      if (!this.receiver) {
        this._currentBitrate = 0;
        return;
      }
      const a = await this.getReceiverStats();
      a && this.prevStats && this.receiver && (this._currentBitrate = Qt(a, this.prevStats)), this.prevStats = a;
    }, this.debouncedHandleResize = Gi(() => {
      this.updateDimensions();
    }, ci), this.adaptiveStreamSettings = s;
  }
  get isAdaptiveStream() {
    return this.adaptiveStreamSettings !== void 0;
  }
  /**
   * Note: When using adaptiveStream, you need to use remoteVideoTrack.attach() to add the track to a HTMLVideoElement, otherwise your video tracks might never start
   */
  get mediaStreamTrack() {
    return this._mediaStreamTrack;
  }
  /** @internal */
  setMuted(e) {
    super.setMuted(e), this.attachedElements.forEach((t) => {
      e ? He(this._mediaStreamTrack, t) : Ve(this._mediaStreamTrack, t);
    });
  }
  attach(e) {
    if (e ? super.attach(e) : e = super.attach(), this.adaptiveStreamSettings && this.elementInfos.find((t) => t.element === e) === void 0) {
      const t = new Wc(e);
      this.observeElementInfo(t);
    }
    return e;
  }
  /**
   * Observe an ElementInfo for changes when adaptive streaming.
   * @param elementInfo
   * @internal
   */
  observeElementInfo(e) {
    this.adaptiveStreamSettings && this.elementInfos.find((t) => t === e) === void 0 ? (e.handleResize = () => {
      this.debouncedHandleResize();
    }, e.handleVisibilityChanged = () => {
      this.updateVisibility();
    }, this.elementInfos.push(e), e.observe(), this.debouncedHandleResize(), this.updateVisibility()) : this.log.warn("visibility resize observer not triggered", this.logContext);
  }
  /**
   * Stop observing an ElementInfo for changes.
   * @param elementInfo
   * @internal
   */
  stopObservingElementInfo(e) {
    if (!this.isAdaptiveStream) {
      this.log.warn("stopObservingElementInfo ignored", this.logContext);
      return;
    }
    const t = this.elementInfos.filter((n) => n === e);
    for (const n of t)
      n.stopObserving();
    this.elementInfos = this.elementInfos.filter((n) => n !== e), this.updateVisibility(), this.debouncedHandleResize();
  }
  detach(e) {
    let t = [];
    if (e)
      return this.stopObservingElement(e), super.detach(e);
    t = super.detach();
    for (const n of t)
      this.stopObservingElement(n);
    return t;
  }
  /** @internal */
  getDecoderImplementation() {
    var e;
    return (e = this.prevStats) === null || e === void 0 ? void 0 : e.decoderImplementation;
  }
  async getReceiverStats() {
    if (!this.receiver || !this.receiver.getStats)
      return;
    const e = await this.receiver.getStats();
    let t, n = "", s = /* @__PURE__ */ new Map();
    return e.forEach((r) => {
      r.type === "inbound-rtp" ? (n = r.codecId, t = {
        type: "video",
        framesDecoded: r.framesDecoded,
        framesDropped: r.framesDropped,
        framesReceived: r.framesReceived,
        packetsReceived: r.packetsReceived,
        packetsLost: r.packetsLost,
        frameWidth: r.frameWidth,
        frameHeight: r.frameHeight,
        pliCount: r.pliCount,
        firCount: r.firCount,
        nackCount: r.nackCount,
        jitter: r.jitter,
        timestamp: r.timestamp,
        bytesReceived: r.bytesReceived,
        decoderImplementation: r.decoderImplementation
      }) : r.type === "codec" && s.set(r.id, r);
    }), t && n !== "" && s.get(n) && (t.mimeType = s.get(n).mimeType), t;
  }
  stopObservingElement(e) {
    const t = this.elementInfos.filter((n) => n.element === e);
    for (const n of t)
      this.stopObservingElementInfo(n);
  }
  async handleAppVisibilityChanged() {
    await super.handleAppVisibilityChanged(), this.isAdaptiveStream && this.updateVisibility();
  }
  updateVisibility() {
    var e, t;
    const n = this.elementInfos.reduce((o, c) => Math.max(o, c.visibilityChangedAt || 0), 0), s = !((e = (t = this.adaptiveStreamSettings) === null || t === void 0 ? void 0 : t.pauseVideoInBackground) !== null && e !== void 0) || e ? this.isInBackground : !1, r = this.elementInfos.some((o) => o.pictureInPicture), a = this.elementInfos.some((o) => o.visible) && !s || r;
    if (this.lastVisible !== a) {
      if (!a && Date.now() - n < ci) {
        Y.setTimeout(() => {
          this.updateVisibility();
        }, ci);
        return;
      }
      this.lastVisible = a, this.emit(T.VisibilityChanged, a, this);
    }
  }
  updateDimensions() {
    var e, t;
    let n = 0, s = 0;
    const r = this.getPixelDensity();
    for (const a of this.elementInfos) {
      const o = a.width() * r, c = a.height() * r;
      o + c > n + s && (n = o, s = c);
    }
    ((e = this.lastDimensions) === null || e === void 0 ? void 0 : e.width) === n && ((t = this.lastDimensions) === null || t === void 0 ? void 0 : t.height) === s || (this.lastDimensions = {
      width: n,
      height: s
    }, this.emit(T.VideoDimensionsChanged, this.lastDimensions, this));
  }
  getPixelDensity() {
    var e;
    const t = (e = this.adaptiveStreamSettings) === null || e === void 0 ? void 0 : e.pixelDensity;
    return t === "screen" ? En() : t || (En() > 2 ? 2 : 1);
  }
}
class Wc {
  constructor(e, t) {
    this.onVisibilityChanged = (n) => {
      const {
        target: s,
        isIntersecting: r
      } = n;
      if (s === this.element) {
        var a;
        this.isIntersecting = r, this.visibilityChangedAt = Date.now(), (a = this.handleVisibilityChanged) === null || a === void 0 || a.call(this);
      }
    }, this.onEnterPiP = () => {
      var n;
      this.isPiP = !0, (n = this.handleVisibilityChanged) === null || n === void 0 || n.call(this);
    }, this.onLeavePiP = () => {
      var n;
      this.isPiP = !1, (n = this.handleVisibilityChanged) === null || n === void 0 || n.call(this);
    }, this.element = e, this.isIntersecting = t != null ? t : Gn(e), this.isPiP = ee() && document.pictureInPictureElement === e, this.visibilityChangedAt = 0;
  }
  get visible() {
    return this.isPiP || this.isIntersecting;
  }
  get pictureInPicture() {
    return this.isPiP;
  }
  width() {
    return this.element.clientWidth;
  }
  height() {
    return this.element.clientHeight;
  }
  observe() {
    this.isIntersecting = Gn(this.element), this.isPiP = document.pictureInPictureElement === this.element, this.element.handleResize = () => {
      var e;
      (e = this.handleResize) === null || e === void 0 || e.call(this);
    }, this.element.handleVisibilityChanged = this.onVisibilityChanged, In().observe(this.element), Rn().observe(this.element), this.element.addEventListener("enterpictureinpicture", this.onEnterPiP), this.element.addEventListener("leavepictureinpicture", this.onLeavePiP);
  }
  stopObserving() {
    var e, t;
    (e = In()) === null || e === void 0 || e.unobserve(this.element), (t = Rn()) === null || t === void 0 || t.unobserve(this.element), this.element.removeEventListener("enterpictureinpicture", this.onEnterPiP), this.element.removeEventListener("leavepictureinpicture", this.onLeavePiP);
  }
}
function Gn(i) {
  let e = i.offsetTop, t = i.offsetLeft;
  const n = i.offsetWidth, s = i.offsetHeight, {
    hidden: r
  } = i, {
    opacity: a,
    display: o
  } = getComputedStyle(i);
  for (; i.offsetParent; )
    i = i.offsetParent, e += i.offsetTop, t += i.offsetLeft;
  return e < window.pageYOffset + window.innerHeight && t < window.pageXOffset + window.innerWidth && e + s > window.pageYOffset && t + n > window.pageXOffset && !r && (a !== "" ? parseFloat(a) > 0 : !0) && o !== "none";
}
class he extends Pe.EventEmitter {
  constructor(e, t, n, s) {
    var r;
    super(), this.metadataMuted = !1, this.encryption = te.NONE, this.log = I, this.handleMuted = () => {
      this.emit(T.Muted);
    }, this.handleUnmuted = () => {
      this.emit(T.Unmuted);
    }, this.log = ve((r = s == null ? void 0 : s.loggerName) !== null && r !== void 0 ? r : de.Publication), this.loggerContextCb = this.loggerContextCb, this.setMaxListeners(100), this.kind = e, this.trackSid = t, this.trackName = n, this.source = v.Source.Unknown;
  }
  /** @internal */
  setTrack(e) {
    this.track && (this.track.off(T.Muted, this.handleMuted), this.track.off(T.Unmuted, this.handleUnmuted)), this.track = e, e && (e.on(T.Muted, this.handleMuted), e.on(T.Unmuted, this.handleUnmuted));
  }
  get logContext() {
    var e;
    return h(h({}, (e = this.loggerContextCb) === null || e === void 0 ? void 0 : e.call(this)), _(this));
  }
  get isMuted() {
    return this.metadataMuted;
  }
  get isEnabled() {
    return !0;
  }
  get isSubscribed() {
    return this.track !== void 0;
  }
  get isEncrypted() {
    return this.encryption !== te.NONE;
  }
  /**
   * an [AudioTrack] if this publication holds an audio track
   */
  get audioTrack() {
    if (this.track instanceof W || this.track instanceof ht)
      return this.track;
  }
  /**
   * an [VideoTrack] if this publication holds a video track
   */
  get videoTrack() {
    if (this.track instanceof Z || this.track instanceof We)
      return this.track;
  }
  /** @internal */
  updateInfo(e) {
    this.trackSid = e.sid, this.trackName = e.name, this.source = v.sourceFromProto(e.source), this.mimeType = e.mimeType, this.kind === v.Kind.Video && e.width > 0 && (this.dimensions = {
      width: e.width,
      height: e.height
    }, this.simulcasted = e.simulcast), this.encryption = e.encryption, this.trackInfo = e, this.log.debug("update publication info", h(h({}, this.logContext), {}, {
      info: e
    }));
  }
}
((i) => {
  ((e) => {
    e.Desired = "desired", e.Subscribed = "subscribed", e.Unsubscribed = "unsubscribed";
  })(i.SubscriptionStatus || (i.SubscriptionStatus = {})), ((e) => {
    e.Allowed = "allowed", e.NotAllowed = "not_allowed";
  })(i.PermissionStatus || (i.PermissionStatus = {}));
})(he || (he = {}));
class jt extends he {
  constructor(e, t, n, s) {
    super(e, t.sid, t.name, s), this.track = void 0, this.handleTrackEnded = () => {
      this.emit(T.Ended);
    }, this.updateInfo(t), this.setTrack(n);
  }
  get isUpstreamPaused() {
    var e;
    return (e = this.track) === null || e === void 0 ? void 0 : e.isUpstreamPaused;
  }
  setTrack(e) {
    this.track && this.track.off(T.Ended, this.handleTrackEnded), super.setTrack(e), e && e.on(T.Ended, this.handleTrackEnded);
  }
  get isMuted() {
    return this.track ? this.track.isMuted : super.isMuted;
  }
  get audioTrack() {
    return super.audioTrack;
  }
  get videoTrack() {
    return super.videoTrack;
  }
  /**
   * Mute the track associated with this publication
   */
  async mute() {
    var e;
    return (e = this.track) === null || e === void 0 ? void 0 : e.mute();
  }
  /**
   * Unmute track associated with this publication
   */
  async unmute() {
    var e;
    return (e = this.track) === null || e === void 0 ? void 0 : e.unmute();
  }
  /**
   * Pauses the media stream track associated with this publication from being sent to the server
   * and signals "muted" event to other participants
   * Useful if you want to pause the stream without pausing the local media stream track
   */
  async pauseUpstream() {
    var e;
    await ((e = this.track) === null || e === void 0 ? void 0 : e.pauseUpstream());
  }
  /**
   * Resumes sending the media stream track associated with this publication to the server after a call to [[pauseUpstream()]]
   * and signals "unmuted" event to other participants (unless the track is explicitly muted)
   */
  async resumeUpstream() {
    var e;
    await ((e = this.track) === null || e === void 0 ? void 0 : e.resumeUpstream());
  }
  getTrackFeatures() {
    if (this.track instanceof W) {
      var e;
      const t = this.track.mediaStreamTrack.getSettings(), n = /* @__PURE__ */ new Set();
      return t.autoGainControl && n.add(ue.TF_AUTO_GAIN_CONTROL), t.echoCancellation && n.add(ue.TF_ECHO_CANCELLATION), t.noiseSuppression && n.add(ue.TF_NOISE_SUPPRESSION), t.channelCount && t.channelCount > 1 && n.add(ue.TF_STEREO), (e = this.options) !== null && e !== void 0 && e.dtx || n.add(ue.TF_STEREO), this.track.enhancedNoiseCancellation && n.add(ue.TF_ENHANCED_NOISE_CANCELLATION), Array.from(n.values());
    } else
      return [];
  }
}
var Ft = /* @__PURE__ */ ((i) => (i.Excellent = "excellent", i.Good = "good", i.Poor = "poor", i.Lost = "lost", i.Unknown = "unknown", i))(Ft || {});
function Jc(i) {
  switch (i) {
    case rt.EXCELLENT:
      return "excellent";
    case rt.GOOD:
      return "good";
    case rt.POOR:
      return "poor";
    case rt.LOST:
      return "lost";
    default:
      return "unknown";
  }
}
class _r extends Pe.EventEmitter {
  /** @internal */
  constructor(e, t, n, s, r) {
    var a;
    super(), this.audioLevel = 0, this.isSpeaking = !1, this._connectionQuality = "unknown", this.log = I, this.log = ve((a = r == null ? void 0 : r.loggerName) !== null && a !== void 0 ? a : de.Participant), this.loggerOptions = r, this.setMaxListeners(100), this.sid = e, this.identity = t, this.name = n, this.metadata = s, this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.trackPublications = /* @__PURE__ */ new Map();
  }
  get logContext() {
    var e, t;
    return h({}, (e = this.loggerOptions) === null || e === void 0 || (t = e.loggerContextCb) === null || t === void 0 ? void 0 : t.call(e));
  }
  get isEncrypted() {
    return this.trackPublications.size > 0 && Array.from(this.trackPublications.values()).every((e) => e.isEncrypted);
  }
  get isAgent() {
    var e, t;
    return (e = (t = this.permissions) === null || t === void 0 ? void 0 : t.agent) !== null && e !== void 0 ? e : !1;
  }
  getTrackPublications() {
    return Array.from(this.trackPublications.values());
  }
  /**
   * Finds the first track that matches the source filter, for example, getting
   * the user's camera track with getTrackBySource(Track.Source.Camera).
   */
  getTrackPublication(e) {
    for (const [, t] of this.trackPublications)
      if (t.source === e)
        return t;
  }
  /**
   * Finds the first track that matches the track's name.
   */
  getTrackPublicationByName(e) {
    for (const [, t] of this.trackPublications)
      if (t.trackName === e)
        return t;
  }
  get connectionQuality() {
    return this._connectionQuality;
  }
  get isCameraEnabled() {
    var e;
    const t = this.getTrackPublication(v.Source.Camera);
    return !(!((e = t == null ? void 0 : t.isMuted) !== null && e !== void 0) || e);
  }
  get isMicrophoneEnabled() {
    var e;
    const t = this.getTrackPublication(v.Source.Microphone);
    return !(!((e = t == null ? void 0 : t.isMuted) !== null && e !== void 0) || e);
  }
  get isScreenShareEnabled() {
    return !!this.getTrackPublication(v.Source.ScreenShare);
  }
  get isLocal() {
    return !1;
  }
  /** when participant joined the room */
  get joinedAt() {
    return this.participantInfo ? new Date(Number.parseInt(this.participantInfo.joinedAt.toString()) * 1e3) : /* @__PURE__ */ new Date();
  }
  /** @internal */
  updateInfo(e) {
    return this.participantInfo && this.participantInfo.sid === e.sid && this.participantInfo.version > e.version ? !1 : (this.identity = e.identity, this.sid = e.sid, this._setName(e.name), this._setMetadata(e.metadata), e.permission && this.setPermissions(e.permission), this.participantInfo = e, this.log.trace("update participant info", h(h({}, this.logContext), {}, {
      info: e
    })), !0);
  }
  /**
   * Updates metadata from server
   **/
  _setMetadata(e) {
    const t = this.metadata !== e, n = this.metadata;
    this.metadata = e, t && this.emit(C.ParticipantMetadataChanged, n);
  }
  _setName(e) {
    const t = this.name !== e;
    this.name = e, t && this.emit(C.ParticipantNameChanged, e);
  }
  /** @internal */
  setPermissions(e) {
    var t, n, s, r, a;
    const o = this.permissions, c = e.canPublish !== ((t = this.permissions) === null || t === void 0 ? void 0 : t.canPublish) || e.canSubscribe !== ((n = this.permissions) === null || n === void 0 ? void 0 : n.canSubscribe) || e.canPublishData !== ((s = this.permissions) === null || s === void 0 ? void 0 : s.canPublishData) || e.hidden !== ((r = this.permissions) === null || r === void 0 ? void 0 : r.hidden) || e.recorder !== ((a = this.permissions) === null || a === void 0 ? void 0 : a.recorder) || e.canPublishSources.length !== this.permissions.canPublishSources.length || e.canPublishSources.some((d, l) => {
      var u;
      return d !== ((u = this.permissions) === null || u === void 0 ? void 0 : u.canPublishSources[l]);
    });
    return this.permissions = e, c && this.emit(C.ParticipantPermissionsChanged, o), c;
  }
  /** @internal */
  setIsSpeaking(e) {
    e !== this.isSpeaking && (this.isSpeaking = e, e && (this.lastSpokeAt = /* @__PURE__ */ new Date()), this.emit(C.IsSpeakingChanged, e));
  }
  /** @internal */
  setConnectionQuality(e) {
    const t = this._connectionQuality;
    this._connectionQuality = Jc(e), t !== this._connectionQuality && this.emit(C.ConnectionQualityChanged, this._connectionQuality);
  }
  /**
   * @internal
   */
  setAudioContext(e) {
    this.audioContext = e, this.audioTrackPublications.forEach((t) => (t.track instanceof ht || t.track instanceof W) && t.track.setAudioContext(e));
  }
  addTrackPublication(e) {
    e.on(T.Muted, () => {
      this.emit(C.TrackMuted, e);
    }), e.on(T.Unmuted, () => {
      this.emit(C.TrackUnmuted, e);
    });
    const t = e;
    switch (t.track && (t.track.sid = e.trackSid), this.trackPublications.set(e.trackSid, e), e.kind) {
      case v.Kind.Audio:
        this.audioTrackPublications.set(e.trackSid, e);
        break;
      case v.Kind.Video:
        this.videoTrackPublications.set(e.trackSid, e);
        break;
    }
  }
}
function Qc(i) {
  var e, t, n;
  if (!i.participantSid && !i.participantIdentity)
    throw new Error("Invalid track permission, must provide at least one of participantIdentity and participantSid");
  return new Cs({
    participantIdentity: (e = i.participantIdentity) !== null && e !== void 0 ? e : "",
    participantSid: (t = i.participantSid) !== null && t !== void 0 ? t : "",
    allTracks: (n = i.allowAll) !== null && n !== void 0 ? n : !1,
    trackSids: i.allowedTrackSids || []
  });
}
class pt extends _r {
  /** @internal */
  constructor(e, t, n, s) {
    super(e, t, void 0, void 0, {
      loggerName: s.loggerName,
      loggerContextCb: () => this.engine.logContext
    }), this.pendingPublishing = /* @__PURE__ */ new Set(), this.pendingPublishPromises = /* @__PURE__ */ new Map(), this.participantTrackPermissions = [], this.allParticipantsAllowedToSubscribe = !0, this.encryptionType = te.NONE, this.handleReconnecting = () => {
      this.reconnectFuture || (this.reconnectFuture = new wr());
    }, this.handleReconnected = () => {
      var r, a;
      (r = this.reconnectFuture) === null || r === void 0 || (a = r.resolve) === null || a === void 0 || a.call(r), this.reconnectFuture = void 0, this.updateTrackSubscriptionPermissions();
    }, this.handleDisconnected = () => {
      if (this.reconnectFuture) {
        var r, a;
        this.reconnectFuture.promise.catch((o) => this.log.warn(o.message, this.logContext)), (r = this.reconnectFuture) === null || r === void 0 || (a = r.reject) === null || a === void 0 || a.call(r, "Got disconnected during reconnection attempt"), this.reconnectFuture = void 0;
      }
    }, this.updateTrackSubscriptionPermissions = () => {
      this.log.debug("updating track subscription permissions", h(h({}, this.logContext), {}, {
        allParticipantsAllowed: this.allParticipantsAllowedToSubscribe,
        participantTrackPermissions: this.participantTrackPermissions
      })), this.engine.client.sendUpdateSubscriptionPermissions(this.allParticipantsAllowedToSubscribe, this.participantTrackPermissions.map((r) => Qc(r)));
    }, this.onTrackUnmuted = (r) => {
      this.onTrackMuted(r, r.isUpstreamPaused);
    }, this.onTrackMuted = (r, a) => {
      if (a === void 0 && (a = !0), !r.sid) {
        this.log.error("could not update mute status for unpublished track", h(h({}, this.logContext), _(r)));
        return;
      }
      this.engine.updateMuteStatus(r.sid, a);
    }, this.onTrackUpstreamPaused = (r) => {
      this.log.debug("upstream paused", h(h({}, this.logContext), _(r))), this.onTrackMuted(r, !0);
    }, this.onTrackUpstreamResumed = (r) => {
      this.log.debug("upstream resumed", h(h({}, this.logContext), _(r))), this.onTrackMuted(r, r.isMuted);
    }, this.onTrackFeatureUpdate = (r) => {
      const a = this.audioTrackPublications.get(r.sid);
      if (!a) {
        this.log.warn("Could not update local audio track settings, missing publication for track ".concat(r.sid), this.logContext);
        return;
      }
      this.engine.client.sendUpdateLocalAudioTrack(a.trackSid, a.getTrackFeatures());
    }, this.handleSubscribedQualityUpdate = async (r) => {
      var a;
      if (!((a = this.roomOptions) !== null && a !== void 0 && a.dynacast))
        return;
      const o = this.videoTrackPublications.get(r.trackSid);
      if (!o) {
        this.log.warn("received subscribed quality update for unknown track", h(h({}, this.logContext), {}, {
          trackSid: r.trackSid
        }));
        return;
      }
      if (r.subscribedCodecs.length > 0) {
        if (!o.videoTrack)
          return;
        const b = await o.videoTrack.setPublishingCodecs(r.subscribedCodecs);
        var c = !1, d = !1, l;
        try {
          for (var u = Fe(b), p; c = !(p = await u.next()).done; c = !1) {
            const y = p.value;
            Wo(y) && (this.log.debug("publish ".concat(y, " for ").concat(o.videoTrack.sid), h(h({}, this.logContext), _(o))), await this.publishAdditionalCodecForTrack(o.videoTrack, y, o.options));
          }
        } catch (y) {
          d = !0, l = y;
        } finally {
          try {
            c && u.return != null && await u.return();
          } finally {
            if (d)
              throw l;
          }
        }
      } else if (r.subscribedQualities.length > 0) {
        var f;
        await ((f = o.videoTrack) === null || f === void 0 ? void 0 : f.setPublishingLayers(r.subscribedQualities));
      }
    }, this.handleLocalTrackUnpublished = (r) => {
      const a = this.trackPublications.get(r.trackSid);
      if (!a) {
        this.log.warn("received unpublished event for unknown track", h(h({}, this.logContext), {}, {
          trackSid: r.trackSid
        }));
        return;
      }
      this.unpublishTrack(a.track);
    }, this.handleTrackEnded = async (r) => {
      if (r.source === v.Source.ScreenShare || r.source === v.Source.ScreenShareAudio)
        this.log.debug("unpublishing local track due to TrackEnded", h(h({}, this.logContext), _(r))), this.unpublishTrack(r);
      else if (r.isUserProvided)
        await r.mute();
      else if (r instanceof W || r instanceof Z)
        try {
          if (ee())
            try {
              var a;
              const o = await ((a = navigator) === null || a === void 0 ? void 0 : a.permissions.query({
                // the permission query for camera and microphone currently not supported in Safari and Firefox
                // @ts-ignore
                name: r.source === v.Source.Camera ? "camera" : "microphone"
              }));
              if (o && o.state === "denied")
                throw this.log.warn("user has revoked access to ".concat(r.source), h(h({}, this.logContext), _(r))), o.onchange = () => {
                  o.state !== "denied" && (r.isMuted || r.restartTrack(), o.onchange = null);
                }, new Error("GetUserMedia Permission denied");
            } catch {
            }
          r.isMuted || (this.log.debug("track ended, attempting to use a different device", h(h({}, this.logContext), _(r))), await r.restartTrack());
        } catch {
          this.log.warn("could not restart track, muting instead", h(h({}, this.logContext), _(r))), await r.mute();
        }
    }, this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.trackPublications = /* @__PURE__ */ new Map(), this.engine = n, this.roomOptions = s, this.setupEngine(n), this.activeDeviceMap = /* @__PURE__ */ new Map();
  }
  get lastCameraError() {
    return this.cameraError;
  }
  get lastMicrophoneError() {
    return this.microphoneError;
  }
  get isE2EEEnabled() {
    return this.encryptionType !== te.NONE;
  }
  getTrackPublication(e) {
    const t = super.getTrackPublication(e);
    if (t)
      return t;
  }
  getTrackPublicationByName(e) {
    const t = super.getTrackPublicationByName(e);
    if (t)
      return t;
  }
  /**
   * @internal
   */
  setupEngine(e) {
    this.engine = e, this.engine.on(P.RemoteMute, (t, n) => {
      const s = this.trackPublications.get(t);
      !s || !s.track || (n ? s.mute() : s.unmute());
    }), this.engine.on(P.Connected, this.handleReconnected).on(P.SignalRestarted, this.handleReconnected).on(P.SignalResumed, this.handleReconnected).on(P.Restarting, this.handleReconnecting).on(P.Resuming, this.handleReconnecting).on(P.LocalTrackUnpublished, this.handleLocalTrackUnpublished).on(P.SubscribedQualityUpdate, this.handleSubscribedQualityUpdate).on(P.Disconnected, this.handleDisconnected);
  }
  /**
   * Sets and updates the metadata of the local participant.
   * The change does not take immediate effect.
   * If successful, a `ParticipantEvent.MetadataChanged` event will be emitted on the local participant.
   * Note: this requires `canUpdateOwnMetadata` permission.
   * @param metadata
   */
  setMetadata(e) {
    var t;
    this.engine.client.sendUpdateLocalMetadata(e, (t = this.name) !== null && t !== void 0 ? t : "");
  }
  /**
   * Sets and updates the name of the local participant.
   * The change does not take immediate effect.
   * If successful, a `ParticipantEvent.ParticipantNameChanged` event will be emitted on the local participant.
   * Note: this requires `canUpdateOwnMetadata` permission.
   * @param metadata
   */
  setName(e) {
    var t;
    this.engine.client.sendUpdateLocalMetadata((t = this.metadata) !== null && t !== void 0 ? t : "", e);
  }
  /**
   * Enable or disable a participant's camera track.
   *
   * If a track has already published, it'll mute or unmute the track.
   * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
   */
  setCameraEnabled(e, t, n) {
    return this.setTrackEnabled(v.Source.Camera, e, t, n);
  }
  /**
   * Enable or disable a participant's microphone track.
   *
   * If a track has already published, it'll mute or unmute the track.
   * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
   */
  setMicrophoneEnabled(e, t, n) {
    return this.setTrackEnabled(v.Source.Microphone, e, t, n);
  }
  /**
   * Start or stop sharing a participant's screen
   * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
   */
  setScreenShareEnabled(e, t, n) {
    return this.setTrackEnabled(v.Source.ScreenShare, e, t, n);
  }
  /** @internal */
  setPermissions(e) {
    const t = this.permissions, n = super.setPermissions(e);
    return n && t && this.emit(C.ParticipantPermissionsChanged, t), n;
  }
  /** @internal */
  async setE2EEEnabled(e) {
    this.encryptionType = e ? te.GCM : te.NONE, await this.republishAllTracks(void 0, !1);
  }
  async setTrackEnabled(e, t, n, s) {
    this.log.debug("setTrackEnabled", h(h({}, this.logContext), {}, {
      source: e,
      enabled: t
    }));
    let r = this.getTrackPublication(e);
    if (t)
      if (r)
        await r.unmute();
      else {
        let o;
        if (this.pendingPublishing.has(e)) {
          this.log.info("skipping duplicate published source", h(h({}, this.logContext), {}, {
            source: e
          }));
          return;
        }
        this.pendingPublishing.add(e);
        try {
          switch (e) {
            case v.Source.Camera:
              o = await this.createTracks({
                video: n != null ? n : !0
              });
              break;
            case v.Source.Microphone:
              o = await this.createTracks({
                audio: n != null ? n : !0
              });
              break;
            case v.Source.ScreenShare:
              o = await this.createScreenTracks(h({}, n));
              break;
            default:
              throw new ce(e);
          }
          const c = [];
          for (const l of o)
            this.log.info("publishing track", h(h({}, this.logContext), _(l))), c.push(this.publishTrack(l, s));
          [r] = await Promise.all(c);
        } catch (c) {
          var a;
          throw (a = o) === null || a === void 0 || a.forEach((d) => {
            d.stop();
          }), c instanceof Error && !(c instanceof ce) && this.emit(C.MediaDevicesError, c), c;
        } finally {
          this.pendingPublishing.delete(e);
        }
      }
    else if (r && r.track)
      if (e === v.Source.ScreenShare) {
        r = await this.unpublishTrack(r.track);
        const o = this.getTrackPublication(v.Source.ScreenShareAudio);
        o && o.track && this.unpublishTrack(o.track);
      } else
        await r.mute();
    return r;
  }
  /**
   * Publish both camera and microphone at the same time. This is useful for
   * displaying a single Permission Dialog box to the end user.
   */
  async enableCameraAndMicrophone() {
    if (!(this.pendingPublishing.has(v.Source.Camera) || this.pendingPublishing.has(v.Source.Microphone))) {
      this.pendingPublishing.add(v.Source.Camera), this.pendingPublishing.add(v.Source.Microphone);
      try {
        const e = await this.createTracks({
          audio: !0,
          video: !0
        });
        await Promise.all(e.map((t) => this.publishTrack(t)));
      } finally {
        this.pendingPublishing.delete(v.Source.Camera), this.pendingPublishing.delete(v.Source.Microphone);
      }
    }
  }
  /**
   * Create local camera and/or microphone tracks
   * @param options
   * @returns
   */
  async createTracks(e) {
    var t, n;
    const s = $o(e, (t = this.roomOptions) === null || t === void 0 ? void 0 : t.audioCaptureDefaults, (n = this.roomOptions) === null || n === void 0 ? void 0 : n.videoCaptureDefaults), r = Hi(s);
    let a;
    try {
      a = await navigator.mediaDevices.getUserMedia(r);
    } catch (o) {
      throw o instanceof Error && (r.audio && (this.microphoneError = o), r.video && (this.cameraError = o)), o;
    }
    return r.audio && (this.microphoneError = void 0, this.emit(C.AudioStreamAcquired)), r.video && (this.cameraError = void 0), a.getTracks().map((o) => {
      const c = o.kind === "audio";
      c ? e.audio : e.video;
      let d;
      const l = c ? r.audio : r.video;
      typeof l != "boolean" && (d = l);
      const u = Lc(o, d, {
        loggerName: this.roomOptions.loggerName,
        loggerContextCb: () => this.logContext
      });
      return u.kind === v.Kind.Video ? u.source = v.Source.Camera : u.kind === v.Kind.Audio && (u.source = v.Source.Microphone), u.mediaStream = a, u;
    });
  }
  /**
   * Creates a screen capture tracks with getDisplayMedia().
   * A LocalVideoTrack is always created and returned.
   * If { audio: true }, and the browser supports audio capture, a LocalAudioTrack is also created.
   */
  async createScreenTracks(e) {
    if (e === void 0 && (e = {}), navigator.mediaDevices.getDisplayMedia === void 0)
      throw new ji("getDisplayMedia not supported");
    e.resolution === void 0 && !sc() && (e.resolution = Jt.h1080fps30.resolution);
    const t = Zo(e), n = await navigator.mediaDevices.getDisplayMedia(t), s = n.getVideoTracks();
    if (s.length === 0)
      throw new ce("no video track found");
    const r = new Z(s[0], void 0, !1, {
      loggerName: this.roomOptions.loggerName,
      loggerContextCb: () => this.logContext
    });
    r.source = v.Source.ScreenShare, e.contentHint && (r.mediaStreamTrack.contentHint = e.contentHint);
    const a = [r];
    if (n.getAudioTracks().length > 0) {
      this.emit(C.AudioStreamAcquired);
      const o = new W(n.getAudioTracks()[0], void 0, !1, this.audioContext, {
        loggerName: this.roomOptions.loggerName,
        loggerContextCb: () => this.logContext
      });
      o.source = v.Source.ScreenShareAudio, a.push(o);
    }
    return a;
  }
  /**
   * Publish a new track to the room
   * @param track
   * @param options
   */
  async publishTrack(e, t) {
    var n, s, r;
    e instanceof W && e.setAudioContext(this.audioContext), await ((n = this.reconnectFuture) === null || n === void 0 ? void 0 : n.promise), e instanceof bt && this.pendingPublishPromises.has(e) && await this.pendingPublishPromises.get(e);
    let a;
    if (e instanceof MediaStreamTrack)
      a = e.getConstraints();
    else {
      a = e.constraints;
      let w;
      switch (e.source) {
        case v.Source.Microphone:
          w = "audioinput";
          break;
        case v.Source.Camera:
          w = "videoinput";
      }
      w && this.activeDeviceMap.has(w) && (a = h(h({}, a), {}, {
        deviceId: this.activeDeviceMap.get(w)
      }));
    }
    if (e instanceof MediaStreamTrack)
      switch (e.kind) {
        case "audio":
          e = new W(e, a, !0, this.audioContext, {
            loggerName: this.roomOptions.loggerName,
            loggerContextCb: () => this.logContext
          });
          break;
        case "video":
          e = new Z(e, a, !0, {
            loggerName: this.roomOptions.loggerName,
            loggerContextCb: () => this.logContext
          });
          break;
        default:
          throw new ce("unsupported MediaStreamTrack kind ".concat(e.kind));
      }
    else
      e.updateLoggerOptions({
        loggerName: this.roomOptions.loggerName,
        loggerContextCb: () => this.logContext
      });
    let o;
    if (this.trackPublications.forEach((w) => {
      w.track && w.track === e && (o = w);
    }), o)
      return this.log.warn("track has already been published, skipping", h(h({}, this.logContext), _(o))), o;
    const c = "channelCount" in e.mediaStreamTrack.getSettings() && // @ts-ignore `channelCount` on getSettings() is currently only available for Safari, but is generally the best way to determine a stereo track https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/channelCount
    e.mediaStreamTrack.getSettings().channelCount === 2 || e.mediaStreamTrack.getConstraints().channelCount === 2, d = (s = (r = t) === null || r === void 0 ? void 0 : r.forceStereo) !== null && s !== void 0 ? s : c;
    if (d) {
      var l, u, p, f;
      t || (t = {}), t.dtx === void 0 && this.log.info("Opus DTX will be disabled for stereo tracks by default. Enable them explicitly to make it work.", h(h({}, this.logContext), _(e))), t.red === void 0 && this.log.info("Opus RED will be disabled for stereo tracks by default. Enable them explicitly to make it work."), (u = (l = t).dtx) !== null && u !== void 0 || (l.dtx = !1), (f = (p = t).red) !== null && f !== void 0 || (p.red = !1);
    }
    const b = h(h({}, this.roomOptions.publishDefaults), t);
    !rc() && this.roomOptions.e2ee && (this.log.info("End-to-end encryption is set up, simulcast publishing will be disabled on Safari versions and iOS browsers running iOS < v17.2", h({}, this.logContext)), b.simulcast = !1), b.source && (e.source = b.source);
    const y = this.publish(e, b, d);
    this.pendingPublishPromises.set(e, y);
    try {
      return await y;
    } catch (w) {
      throw w;
    } finally {
      this.pendingPublishPromises.delete(e);
    }
  }
  async publish(e, t, n) {
    var s, r;
    Array.from(this.trackPublications.values()).find((A) => e instanceof bt && A.source === e.source) && e.source !== v.Source.Unknown && this.log.info("publishing a second track with the same source: ".concat(e.source), h(h({}, this.logContext), _(e))), t.stopMicTrackOnMute && e instanceof W && (e.stopOnMute = !0), e.source === v.Source.ScreenShare && Qe() && (t.simulcast = !1), t.videoCodec === "av1" && !yr() && (t.videoCodec = void 0), t.videoCodec === "vp9" && !Tr() && (t.videoCodec = void 0), t.videoCodec === void 0 && (t.videoCodec = Di);
    const o = t.videoCodec;
    e.on(T.Muted, this.onTrackMuted), e.on(T.Unmuted, this.onTrackUnmuted), e.on(T.Ended, this.handleTrackEnded), e.on(T.UpstreamPaused, this.onTrackUpstreamPaused), e.on(T.UpstreamResumed, this.onTrackUpstreamResumed), e.on(T.AudioTrackFeatureUpdate, this.onTrackFeatureUpdate);
    const c = new mi({
      // get local track id for use during publishing
      cid: e.mediaStreamTrack.id,
      name: t.name,
      type: v.kindToProto(e.kind),
      muted: e.isMuted,
      source: v.sourceToProto(e.source),
      disableDtx: !(!((s = t.dtx) !== null && s !== void 0) || s),
      encryption: this.encryptionType,
      stereo: n,
      disableRed: this.isE2EEEnabled || !(!((r = t.red) !== null && r !== void 0) || r),
      stream: t == null ? void 0 : t.stream
    });
    let d;
    if (e.kind === v.Kind.Video) {
      let A = {
        width: 0,
        height: 0
      };
      try {
        A = await e.waitForDimensions();
      } catch {
        var l, u;
        const ke = (l = (u = this.roomOptions.videoCaptureDefaults) === null || u === void 0 ? void 0 : u.resolution) !== null && l !== void 0 ? l : me.h720.resolution;
        A = {
          width: ke.width,
          height: ke.height
        }, this.log.error("could not determine track dimensions, using defaults", h(h(h({}, this.logContext), _(e)), {}, {
          dims: A
        }));
      }
      if (c.width = A.width, c.height = A.height, e instanceof Z) {
        if (gt(o)) {
          var p;
          e.source === v.Source.ScreenShare && (t.scalabilityMode = "L1T3", "contentHint" in e.mediaStreamTrack && (e.mediaStreamTrack.contentHint = "motion", this.log.info("forcing contentHint to motion for screenshare with SVC codecs", h(h({}, this.logContext), _(e))))), t.scalabilityMode = (p = t.scalabilityMode) !== null && p !== void 0 ? p : "L3T3_KEY";
        }
        c.simulcastCodecs = [new fi({
          codec: o,
          cid: e.mediaStreamTrack.id
        })], t.backupCodec === !0 && (t.backupCodec = {
          codec: Di
        }), t.backupCodec && o !== t.backupCodec.codec && // TODO remove this once e2ee is supported for backup codecs
        c.encryption === te.NONE && (this.roomOptions.dynacast || (this.roomOptions.dynacast = !0), c.simulcastCodecs.push(new fi({
          codec: t.backupCodec.codec,
          cid: ""
        })));
      }
      d = Li(e.source === v.Source.ScreenShare, c.width, c.height, t), c.layers = Bn(c.width, c.height, d, gt(t.videoCodec));
    } else if (e.kind === v.Kind.Audio) {
      var f, b, y, w, S;
      d = [{
        maxBitrate: (f = t.audioPreset) === null || f === void 0 ? void 0 : f.maxBitrate,
        priority: (b = (y = t.audioPreset) === null || y === void 0 ? void 0 : y.priority) !== null && b !== void 0 ? b : "high",
        networkPriority: (w = (S = t.audioPreset) === null || S === void 0 ? void 0 : S.priority) !== null && w !== void 0 ? w : "high"
      }];
    }
    if (!this.engine || this.engine.isClosed)
      throw new K("cannot publish track when not connected");
    const N = await this.engine.addTrack(c);
    let U;
    if (N.codecs.forEach((A) => {
      U === void 0 && (U = A.mimeType);
    }), U && e.kind === v.Kind.Video) {
      const A = kr(U);
      A !== o && (this.log.debug("falling back to server selected codec", h(h(h({}, this.logContext), _(e)), {}, {
        codec: A
      })), t.videoCodec = A, d = Li(e.source === v.Source.ScreenShare, c.width, c.height, t));
    }
    const V = new jt(e.kind, N, e, {
      loggerName: this.roomOptions.loggerName,
      loggerContextCb: () => this.logContext
    });
    if (V.options = t, e.sid = N.sid, !this.engine.pcManager)
      throw new K("pcManager is not ready");
    if (this.log.debug("publishing ".concat(e.kind, " with encodings"), h(h({}, this.logContext), {}, {
      encodings: d,
      trackInfo: N
    })), e.sender = await this.engine.createSender(e, t, d), d) {
      var q;
      if (Qe() && e.kind === v.Kind.Audio) {
        let A;
        for (const Ze of this.engine.pcManager.publisher.getTransceivers())
          if (Ze.sender === e.sender) {
            A = Ze;
            break;
          }
        if (A) {
          var Xe;
          this.engine.pcManager.publisher.setTrackCodecBitrate({
            transceiver: A,
            codec: "opus",
            maxbr: (Xe = d[0]) !== null && Xe !== void 0 && Xe.maxBitrate ? d[0].maxBitrate / 1e3 : 0
          });
        }
      } else
        e.codec && e.codec == "av1" && (q = d[0]) !== null && q !== void 0 && q.maxBitrate && this.engine.pcManager.publisher.setTrackCodecBitrate({
          cid: c.cid,
          codec: e.codec,
          maxbr: d[0].maxBitrate / 1e3
        });
    }
    if (e.kind === v.Kind.Video && e.source === v.Source.ScreenShare)
      try {
        this.log.debug("setting degradationPreference to maintain-resolution");
        const A = e.sender.getParameters();
        A.degradationPreference = "maintain-resolution", await e.sender.setParameters(A);
      } catch (A) {
        this.log.warn("failed to set degradationPreference: ".concat(A));
      }
    return await this.engine.negotiate(), e instanceof Z ? e.startMonitor(this.engine.client) : e instanceof W && e.startMonitor(), this.addTrackPublication(V), this.emit(C.LocalTrackPublished, V), V;
  }
  get isLocal() {
    return !0;
  }
  /** @internal
   * publish additional codec to existing track
   */
  async publishAdditionalCodecForTrack(e, t, n) {
    var s;
    if (this.encryptionType !== te.NONE)
      return;
    let r;
    if (this.trackPublications.forEach((u) => {
      u.track && u.track === e && (r = u);
    }), !r)
      throw new ce("track is not published");
    if (!(e instanceof Z))
      throw new ce("track is not a video track");
    const a = h(h({}, (s = this.roomOptions) === null || s === void 0 ? void 0 : s.publishDefaults), n), o = Vc(e, t, a);
    if (!o) {
      this.log.info("backup codec has been disabled, ignoring request to add additional codec for track", h(h({}, this.logContext), _(e)));
      return;
    }
    const c = e.addSimulcastTrack(t, o);
    if (!c)
      return;
    const d = new mi({
      cid: c.mediaStreamTrack.id,
      type: v.kindToProto(e.kind),
      muted: e.isMuted,
      source: v.sourceToProto(e.source),
      sid: e.sid,
      simulcastCodecs: [{
        codec: a.videoCodec,
        cid: c.mediaStreamTrack.id
      }]
    });
    if (d.layers = Bn(d.width, d.height, o), !this.engine || this.engine.isClosed)
      throw new K("cannot publish track when not connected");
    const l = await this.engine.addTrack(d);
    await this.engine.createSimulcastSender(e, c, a, o), await this.engine.negotiate(), this.log.debug("published ".concat(t, " for track ").concat(e.sid), h(h({}, this.logContext), {}, {
      encodings: o,
      trackInfo: l
    }));
  }
  async unpublishTrack(e, t) {
    const n = this.getPublicationForTrack(e), s = n ? _(n) : void 0;
    if (this.log.debug("unpublishing track", h(h({}, this.logContext), s)), !n || !n.track) {
      this.log.warn("track was not unpublished because no publication was found", h(h({}, this.logContext), s));
      return;
    }
    if (e = n.track, e.off(T.Muted, this.onTrackMuted), e.off(T.Unmuted, this.onTrackUnmuted), e.off(T.Ended, this.handleTrackEnded), e.off(T.UpstreamPaused, this.onTrackUpstreamPaused), e.off(T.UpstreamResumed, this.onTrackUpstreamResumed), e.off(T.AudioTrackFeatureUpdate, this.onTrackFeatureUpdate), t === void 0) {
      var r, a;
      t = (r = (a = this.roomOptions) === null || a === void 0 ? void 0 : a.stopLocalTrackOnUnpublish) !== null && r !== void 0 ? r : !0;
    }
    t && e.stop();
    let o = !1;
    const c = e.sender;
    if (e.sender = void 0, this.engine.pcManager && this.engine.pcManager.currentState < X.FAILED && c)
      try {
        for (const d of this.engine.pcManager.publisher.getTransceivers())
          d.sender === c && (d.direction = "inactive", o = !0);
        if (this.engine.removeTrack(c) && (o = !0), e instanceof Z) {
          for (const [, d] of e.simulcastCodecs)
            d.sender && (this.engine.removeTrack(d.sender) && (o = !0), d.sender = void 0);
          e.simulcastCodecs.clear();
        }
      } catch (d) {
        this.log.warn("failed to unpublish track", h(h(h({}, this.logContext), s), {}, {
          error: d
        }));
      }
    switch (this.trackPublications.delete(n.trackSid), n.kind) {
      case v.Kind.Audio:
        this.audioTrackPublications.delete(n.trackSid);
        break;
      case v.Kind.Video:
        this.videoTrackPublications.delete(n.trackSid);
        break;
    }
    return this.emit(C.LocalTrackUnpublished, n), n.setTrack(void 0), o && await this.engine.negotiate(), n;
  }
  async unpublishTracks(e) {
    return (await Promise.all(e.map((n) => this.unpublishTrack(n)))).filter((n) => n instanceof jt);
  }
  async republishAllTracks(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    const n = [];
    this.trackPublications.forEach((s) => {
      s.track && (e && (s.options = h(h({}, s.options), e)), n.push(s));
    }), await Promise.all(n.map(async (s) => {
      const r = s.track;
      await this.unpublishTrack(r, !1), t && !r.isMuted && r.source !== v.Source.ScreenShare && r.source !== v.Source.ScreenShareAudio && (r instanceof W || r instanceof Z) && !r.isUserProvided && (this.log.debug("restarting existing track", h(h({}, this.logContext), {}, {
        track: s.trackSid
      })), await r.restartTrack()), await this.publishTrack(r, s.options);
    }));
  }
  /**
   * Publish a new data payload to the room. Data will be forwarded to each
   * participant in the room if the destination field in publishOptions is empty
   *
   * @param data Uint8Array of the payload. To send string data, use TextEncoder.encode
   * @param options optionally specify a `reliable`, `topic` and `destination`
   */
  async publishData(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const n = t.reliable ? z.RELIABLE : z.LOSSY, s = t.destinationIdentities, r = t.topic, a = new us({
      kind: n,
      value: {
        case: "user",
        value: new ps({
          participantIdentity: this.identity,
          payload: e,
          destinationIdentities: s,
          topic: r
        })
      }
    });
    await this.engine.sendDataPacket(a, n);
  }
  /**
   * Control who can subscribe to LocalParticipant's published tracks.
   *
   * By default, all participants can subscribe. This allows fine-grained control over
   * who is able to subscribe at a participant and track level.
   *
   * Note: if access is given at a track-level (i.e. both [allParticipantsAllowed] and
   * [ParticipantTrackPermission.allTracksAllowed] are false), any newer published tracks
   * will not grant permissions to any participants and will require a subsequent
   * permissions update to allow subscription.
   *
   * @param allParticipantsAllowed Allows all participants to subscribe all tracks.
   *  Takes precedence over [[participantTrackPermissions]] if set to true.
   *  By default this is set to true.
   * @param participantTrackPermissions Full list of individual permissions per
   *  participant/track. Any omitted participants will not receive any permissions.
   */
  setTrackSubscriptionPermissions(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    this.participantTrackPermissions = t, this.allParticipantsAllowedToSubscribe = e, this.engine.client.isDisconnected || this.updateTrackSubscriptionPermissions();
  }
  /** @internal */
  updateInfo(e) {
    return e.sid !== this.sid || !super.updateInfo(e) ? !1 : (e.tracks.forEach((t) => {
      const n = this.trackPublications.get(t.sid);
      if (n) {
        var s, r;
        const a = n.isMuted || ((s = (r = n.track) === null || r === void 0 ? void 0 : r.isUpstreamPaused) !== null && s !== void 0 ? s : !1);
        a !== t.muted && (this.log.debug("updating server mute state after reconcile", h(h(h({}, this.logContext), _(n)), {}, {
          mutedOnServer: a
        })), this.engine.client.sendMuteTrack(t.sid, a));
      }
    }), !0);
  }
  getPublicationForTrack(e) {
    let t;
    return this.trackPublications.forEach((n) => {
      const s = n.track;
      s && (e instanceof MediaStreamTrack ? (s instanceof W || s instanceof Z) && s.mediaStreamTrack === e && (t = n) : e === s && (t = n));
    }), t;
  }
}
class Lr extends he {
  constructor(e, t, n, s) {
    super(e, t.sid, t.name, s), this.track = void 0, this.allowed = !0, this.disabled = !1, this.currentVideoQuality = Q.HIGH, this.handleEnded = (r) => {
      this.setTrack(void 0), this.emit(T.Ended, r);
    }, this.handleVisibilityChange = (r) => {
      this.log.debug("adaptivestream video visibility ".concat(this.trackSid, ", visible=").concat(r), this.logContext), this.disabled = !r, this.emitTrackUpdate();
    }, this.handleVideoDimensionsChange = (r) => {
      this.log.debug("adaptivestream video dimensions ".concat(r.width, "x").concat(r.height), this.logContext), this.videoDimensions = r, this.emitTrackUpdate();
    }, this.subscribed = n, this.updateInfo(t);
  }
  /**
   * Subscribe or unsubscribe to this remote track
   * @param subscribed true to subscribe to a track, false to unsubscribe
   */
  setSubscribed(e) {
    const t = this.subscriptionStatus, n = this.permissionStatus;
    this.subscribed = e, e && (this.allowed = !0);
    const s = new Ht({
      trackSids: [this.trackSid],
      subscribe: this.subscribed,
      participantTracks: [new fs({
        // sending an empty participant id since TrackPublication doesn't keep it
        // this is filled in by the participant that receives this message
        participantSid: "",
        trackSids: [this.trackSid]
      })]
    });
    this.emit(T.UpdateSubscription, s), this.emitSubscriptionUpdateIfChanged(t), this.emitPermissionUpdateIfChanged(n);
  }
  get subscriptionStatus() {
    return this.subscribed === !1 ? he.SubscriptionStatus.Unsubscribed : super.isSubscribed ? he.SubscriptionStatus.Subscribed : he.SubscriptionStatus.Desired;
  }
  get permissionStatus() {
    return this.allowed ? he.PermissionStatus.Allowed : he.PermissionStatus.NotAllowed;
  }
  /**
   * Returns true if track is subscribed, and ready for playback
   */
  get isSubscribed() {
    return this.subscribed === !1 ? !1 : super.isSubscribed;
  }
  // returns client's desire to subscribe to a track, also true if autoSubscribe is enabled
  get isDesired() {
    return this.subscribed !== !1;
  }
  get isEnabled() {
    return !this.disabled;
  }
  /**
   * disable server from sending down data for this track. this is useful when
   * the participant is off screen, you may disable streaming down their video
   * to reduce bandwidth requirements
   * @param enabled
   */
  setEnabled(e) {
    !this.isManualOperationAllowed() || this.disabled === !e || (this.disabled = !e, this.emitTrackUpdate());
  }
  /**
   * for tracks that support simulcasting, adjust subscribed quality
   *
   * This indicates the highest quality the client can accept. if network
   * bandwidth does not allow, server will automatically reduce quality to
   * optimize for uninterrupted video
   */
  setVideoQuality(e) {
    !this.isManualOperationAllowed() || this.currentVideoQuality === e || (this.currentVideoQuality = e, this.videoDimensions = void 0, this.emitTrackUpdate());
  }
  setVideoDimensions(e) {
    var t, n;
    this.isManualOperationAllowed() && (((t = this.videoDimensions) === null || t === void 0 ? void 0 : t.width) === e.width && ((n = this.videoDimensions) === null || n === void 0 ? void 0 : n.height) === e.height || (this.track instanceof We && (this.videoDimensions = e), this.currentVideoQuality = void 0, this.emitTrackUpdate()));
  }
  setVideoFPS(e) {
    this.isManualOperationAllowed() && this.track instanceof We && this.fps !== e && (this.fps = e, this.emitTrackUpdate());
  }
  get videoQuality() {
    return this.currentVideoQuality;
  }
  /** @internal */
  setTrack(e) {
    const t = this.subscriptionStatus, n = this.permissionStatus, s = this.track;
    s !== e && (s && (s.off(T.VideoDimensionsChanged, this.handleVideoDimensionsChange), s.off(T.VisibilityChanged, this.handleVisibilityChange), s.off(T.Ended, this.handleEnded), s.detach(), s.stopMonitor(), this.emit(T.Unsubscribed, s)), super.setTrack(e), e && (e.sid = this.trackSid, e.on(T.VideoDimensionsChanged, this.handleVideoDimensionsChange), e.on(T.VisibilityChanged, this.handleVisibilityChange), e.on(T.Ended, this.handleEnded), this.emit(T.Subscribed, e)), this.emitPermissionUpdateIfChanged(n), this.emitSubscriptionUpdateIfChanged(t));
  }
  /** @internal */
  setAllowed(e) {
    const t = this.subscriptionStatus, n = this.permissionStatus;
    this.allowed = e, this.emitPermissionUpdateIfChanged(n), this.emitSubscriptionUpdateIfChanged(t);
  }
  /** @internal */
  setSubscriptionError(e) {
    this.emit(T.SubscriptionFailed, e);
  }
  /** @internal */
  updateInfo(e) {
    super.updateInfo(e);
    const t = this.metadataMuted;
    this.metadataMuted = e.muted, this.track ? this.track.setMuted(e.muted) : t !== e.muted && this.emit(e.muted ? T.Muted : T.Unmuted);
  }
  emitSubscriptionUpdateIfChanged(e) {
    const t = this.subscriptionStatus;
    e !== t && this.emit(T.SubscriptionStatusChanged, t, e);
  }
  emitPermissionUpdateIfChanged(e) {
    this.permissionStatus !== e && this.emit(T.SubscriptionPermissionChanged, this.permissionStatus, e);
  }
  isManualOperationAllowed() {
    return this.kind === v.Kind.Video && this.isAdaptiveStream ? (this.log.warn("adaptive stream is enabled, cannot change video track settings", this.logContext), !1) : this.isDesired ? !0 : (this.log.warn("cannot update track settings when not subscribed", this.logContext), !1);
  }
  get isAdaptiveStream() {
    return this.track instanceof We && this.track.isAdaptiveStream;
  }
  /* @internal */
  emitTrackUpdate() {
    const e = new bs({
      trackSids: [this.trackSid],
      disabled: this.disabled,
      fps: this.fps
    });
    this.videoDimensions ? (e.width = Math.ceil(this.videoDimensions.width), e.height = Math.ceil(this.videoDimensions.height)) : this.currentVideoQuality !== void 0 ? e.quality = this.currentVideoQuality : e.quality = Q.HIGH, this.emit(T.UpdateSettings, e);
  }
}
class $e extends _r {
  /** @internal */
  static fromParticipantInfo(e, t) {
    return new $e(e, t.sid, t.identity, t.name, t.metadata);
  }
  get logContext() {
    return h(h({}, super.logContext), {}, {
      rpID: this.sid,
      remoteParticipant: this.identity
    });
  }
  /** @internal */
  constructor(e, t, n, s, r, a) {
    super(t, n || "", s, r, a), this.signalClient = e, this.trackPublications = /* @__PURE__ */ new Map(), this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.volumeMap = /* @__PURE__ */ new Map();
  }
  addTrackPublication(e) {
    super.addTrackPublication(e), e.on(T.UpdateSettings, (t) => {
      this.log.debug("send update settings", h(h({}, this.logContext), _(e))), this.signalClient.sendUpdateTrackSettings(t);
    }), e.on(T.UpdateSubscription, (t) => {
      t.participantTracks.forEach((n) => {
        n.participantSid = this.sid;
      }), this.signalClient.sendUpdateSubscription(t);
    }), e.on(T.SubscriptionPermissionChanged, (t) => {
      this.emit(C.TrackSubscriptionPermissionChanged, e, t);
    }), e.on(T.SubscriptionStatusChanged, (t) => {
      this.emit(C.TrackSubscriptionStatusChanged, e, t);
    }), e.on(T.Subscribed, (t) => {
      this.emit(C.TrackSubscribed, t, e);
    }), e.on(T.Unsubscribed, (t) => {
      this.emit(C.TrackUnsubscribed, t, e);
    }), e.on(T.SubscriptionFailed, (t) => {
      this.emit(C.TrackSubscriptionFailed, e.trackSid, t);
    });
  }
  getTrackPublication(e) {
    const t = super.getTrackPublication(e);
    if (t)
      return t;
  }
  getTrackPublicationByName(e) {
    const t = super.getTrackPublicationByName(e);
    if (t)
      return t;
  }
  /**
   * sets the volume on the participant's audio track
   * by default, this affects the microphone publication
   * a different source can be passed in as a second argument
   * if no track exists the volume will be applied when the microphone track is added
   */
  setVolume(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v.Source.Microphone;
    this.volumeMap.set(t, e);
    const n = this.getTrackPublication(t);
    n && n.track && n.track.setVolume(e);
  }
  /**
   * gets the volume on the participant's microphone track
   */
  getVolume() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : v.Source.Microphone;
    const t = this.getTrackPublication(e);
    return t && t.track ? t.track.getVolume() : this.volumeMap.get(e);
  }
  /** @internal */
  addSubscribedMediaTrack(e, t, n, s, r, a) {
    let o = this.getTrackPublicationBySid(t);
    if (o || t.startsWith("TR") || this.trackPublications.forEach((l) => {
      !o && e.kind === l.kind.toString() && (o = l);
    }), !o) {
      if (a === 0) {
        this.log.error("could not find published track", h(h({}, this.logContext), {}, {
          trackSid: t
        })), this.emit(C.TrackSubscriptionFailed, t);
        return;
      }
      a === void 0 && (a = 20), setTimeout(() => {
        this.addSubscribedMediaTrack(e, t, n, s, r, a - 1);
      }, 150);
      return;
    }
    if (e.readyState === "ended") {
      this.log.error("unable to subscribe because MediaStreamTrack is ended. Do not call MediaStreamTrack.stop()", h(h({}, this.logContext), _(o))), this.emit(C.TrackSubscriptionFailed, t);
      return;
    }
    const c = e.kind === "video";
    let d;
    return c ? d = new We(e, t, s, r) : d = new ht(e, t, s, this.audioContext, this.audioOutput), d.source = o.source, d.isMuted = o.isMuted, d.setMediaStream(n), d.start(), o.setTrack(d), this.volumeMap.has(o.source) && d instanceof ht && d.setVolume(this.volumeMap.get(o.source)), o;
  }
  /** @internal */
  get hasMetadata() {
    return !!this.participantInfo;
  }
  /**
   * @internal
   */
  getTrackPublicationBySid(e) {
    return this.trackPublications.get(e);
  }
  /** @internal */
  updateInfo(e) {
    if (!super.updateInfo(e))
      return !1;
    const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    return e.tracks.forEach((s) => {
      let r = this.getTrackPublicationBySid(s.sid);
      if (r)
        r.updateInfo(s);
      else {
        var a, o;
        const c = v.kindFromProto(s.type);
        if (!c)
          return;
        r = new Lr(c, s, (a = this.signalClient.connectOptions) === null || a === void 0 ? void 0 : a.autoSubscribe, {
          loggerContextCb: () => this.logContext,
          loggerName: (o = this.loggerOptions) === null || o === void 0 ? void 0 : o.loggerName
        }), r.updateInfo(s), n.set(s.sid, r);
        const d = Array.from(this.trackPublications.values()).find((l) => {
          var u;
          return l.source === ((u = r) === null || u === void 0 ? void 0 : u.source);
        });
        d && r.source !== v.Source.Unknown && this.log.debug("received a second track publication for ".concat(this.identity, " with the same source: ").concat(r.source), h(h({}, this.logContext), {}, {
          oldTrack: _(d),
          newTrack: _(r)
        })), this.addTrackPublication(r);
      }
      t.set(s.sid, r);
    }), this.trackPublications.forEach((s) => {
      t.has(s.trackSid) || (this.log.trace("detected removed track on remote participant, unpublishing", h(h({}, this.logContext), _(s))), this.unpublishTrack(s.trackSid, !0));
    }), n.forEach((s) => {
      this.emit(C.TrackPublished, s);
    }), !0;
  }
  /** @internal */
  unpublishTrack(e, t) {
    const n = this.trackPublications.get(e);
    if (!n)
      return;
    const {
      track: s
    } = n;
    switch (s && (s.stop(), n.setTrack(void 0)), this.trackPublications.delete(e), n.kind) {
      case v.Kind.Audio:
        this.audioTrackPublications.delete(e);
        break;
      case v.Kind.Video:
        this.videoTrackPublications.delete(e);
        break;
    }
    t && this.emit(C.TrackUnpublished, n);
  }
  /**
   * @internal
   */
  async setAudioOutput(e) {
    this.audioOutput = e;
    const t = [];
    this.audioTrackPublications.forEach((n) => {
      if (n.track instanceof ht) {
        var s;
        t.push(n.track.setSinkId((s = e.deviceId) !== null && s !== void 0 ? s : "default"));
      }
    }), await Promise.all(t);
  }
  /** @internal */
  emit(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    return this.log.trace("participant event", h(h({}, this.logContext), {}, {
      event: e,
      args: n
    })), super.emit(e, ...n);
  }
}
var $t = /* @__PURE__ */ ((i) => (i.Disconnected = "disconnected", i.Connecting = "connecting", i.Connected = "connected", i.Reconnecting = "reconnecting", i))($t || {});
const $c = 2 * 1e3;
class Ar extends Pe.EventEmitter {
  /**
   * Creates a new Room, the primary construct for a LiveKit session.
   * @param options
   */
  constructor(e) {
    var t, n, s;
    super(), t = this, this.state = "disconnected", this.activeSpeakers = [], this.isE2EEEnabled = !1, this.audioEnabled = !0, this.isVideoPlaybackBlocked = !1, this.log = I, this.bufferedEvents = [], this.isResuming = !1, this.connect = async (r, a, o) => {
      var c;
      if (!nc())
        throw Ce() ? Error("WebRTC isn't detected, have you called registerGlobals?") : Error("LiveKit doesn't seem to be supported on this browser. Try to update your browser and make sure no browser extensions are disabling webRTC.");
      const d = await this.disconnectLock.lock();
      if (this.state === "connected")
        return this.log.info("already connected to room ".concat(this.name), this.logContext), d(), Promise.resolve();
      if (this.connectFuture)
        return d(), this.connectFuture.promise;
      this.setAndEmitConnectionState(
        "connecting"
        /* Connecting */
      ), ((c = this.regionUrlProvider) === null || c === void 0 ? void 0 : c.getServerUrl().toString()) !== r && (this.regionUrl = void 0, this.regionUrlProvider = void 0), Mi(new URL(r)) && (this.regionUrlProvider === void 0 ? this.regionUrlProvider = new jn(r, a) : this.regionUrlProvider.updateToken(a), this.regionUrlProvider.fetchRegionSettings().catch((p) => {
        this.log.warn("could not fetch region settings", h(h({}, this.logContext), {}, {
          error: p
        }));
      }));
      const l = async (p, f, b) => {
        this.abortController && this.abortController.abort();
        const y = new AbortController();
        this.abortController = y, d == null || d();
        try {
          await this.attemptConnection(b != null ? b : r, a, o, y), this.abortController = void 0, p();
        } catch (S) {
          if (this.regionUrlProvider && S instanceof L && S.reason !== J.Cancelled && S.reason !== J.NotAllowed) {
            let N = null;
            try {
              var w;
              N = await this.regionUrlProvider.getNextBestRegionUrl((w = this.abortController) === null || w === void 0 ? void 0 : w.signal);
            } catch (U) {
              if (U instanceof L && (U.status === 401 || U.reason === J.Cancelled)) {
                this.handleDisconnect(this.options.stopLocalTrackOnUnpublish), f(U);
                return;
              }
            }
            N ? (this.log.info("Initial connection failed with ConnectionError: ".concat(S.message, ". Retrying with another region: ").concat(N), this.logContext), this.recreateEngine(), await l(p, f, N)) : (this.handleDisconnect(this.options.stopLocalTrackOnUnpublish), f(S));
          } else
            this.handleDisconnect(this.options.stopLocalTrackOnUnpublish), f(S);
        }
      }, u = this.regionUrl;
      return this.regionUrl = void 0, this.connectFuture = new wr((p, f) => {
        l(p, f, u);
      }, () => {
        this.clearConnectionFutures();
      }), this.connectFuture.promise;
    }, this.connectSignal = async (r, a, o, c, d, l) => {
      var u, p, f;
      const b = await o.join(r, a, {
        autoSubscribe: c.autoSubscribe,
        adaptiveStream: typeof d.adaptiveStream == "object" ? !0 : d.adaptiveStream,
        maxRetries: c.maxRetries,
        e2eeEnabled: !!this.e2eeManager,
        websocketTimeout: c.websocketTimeout
      }, l.signal);
      let y = b.serverInfo;
      if (y || (y = {
        version: b.serverVersion,
        region: b.serverRegion
      }), this.log.debug("connected to Livekit Server ".concat(Object.entries(y).map((w) => {
        let [S, N] = w;
        return "".concat(S, ": ").concat(N);
      }).join(", ")), {
        room: (u = b.room) === null || u === void 0 ? void 0 : u.name,
        roomSid: (p = b.room) === null || p === void 0 ? void 0 : p.sid,
        identity: (f = b.participant) === null || f === void 0 ? void 0 : f.identity
      }), !b.serverVersion)
        throw new Vo("unknown server version");
      return b.serverVersion === "0.15.1" && this.options.dynacast && (this.log.debug("disabling dynacast due to server version", this.logContext), d.dynacast = !1), b;
    }, this.applyJoinResponse = (r) => {
      const a = r.participant;
      if (this.localParticipant.sid = a.sid, this.localParticipant.identity = a.identity, this.options.e2ee && this.e2eeManager)
        try {
          this.e2eeManager.setSifTrailer(r.sifTrailer);
        } catch (o) {
          this.log.error(o instanceof Error ? o.message : "Could not set SifTrailer", h(h({}, this.logContext), {}, {
            error: o
          }));
        }
      this.handleParticipantUpdates([a, ...r.otherParticipants]), r.room && this.handleRoomUpdate(r.room);
    }, this.attemptConnection = async (r, a, o, c) => {
      var d, l;
      this.state === "reconnecting" || this.isResuming || (d = this.engine) !== null && d !== void 0 && d.pendingReconnect ? (this.log.info("Reconnection attempt replaced by new connection attempt", this.logContext), this.recreateEngine()) : this.maybeCreateEngine(), (l = this.regionUrlProvider) !== null && l !== void 0 && l.isCloud() && this.engine.setRegionUrlProvider(this.regionUrlProvider), this.acquireAudioContext(), this.connOptions = h(h({}, Ji), o), this.connOptions.rtcConfig && (this.engine.rtcConfig = this.connOptions.rtcConfig), this.connOptions.peerConnectionTimeout && (this.engine.peerConnectionTimeout = this.connOptions.peerConnectionTimeout);
      try {
        const p = await this.connectSignal(r, a, this.engine, this.connOptions, this.options, c);
        this.applyJoinResponse(p), this.setupLocalParticipantEvents(), this.emit(k.SignalConnected);
      } catch (p) {
        await this.engine.close(), this.recreateEngine();
        const f = new L("could not establish signal connection");
        throw p instanceof Error && (f.message = "".concat(f.message, ": ").concat(p.message)), p instanceof L && (f.reason = p.reason, f.status = p.status), this.log.debug("error trying to establish signal connection", h(h({}, this.logContext), {}, {
          error: p
        })), f;
      }
      if (c.signal.aborted)
        throw await this.engine.close(), this.recreateEngine(), new L("Connection attempt aborted");
      try {
        await this.engine.waitForPCInitialConnection(this.connOptions.peerConnectionTimeout, c);
      } catch (p) {
        throw await this.engine.close(), this.recreateEngine(), p;
      }
      if (ee() && this.options.disconnectOnPageLeave && (window.addEventListener("pagehide", this.onPageLeave), window.addEventListener("beforeunload", this.onPageLeave)), ee()) {
        var u;
        document.addEventListener("freeze", this.onPageLeave), (u = navigator.mediaDevices) === null || u === void 0 || u.addEventListener("devicechange", this.handleDeviceChange);
      }
      this.setAndEmitConnectionState(
        "connected"
        /* Connected */
      ), this.emit(k.Connected), this.registerConnectionReconcile();
    }, this.disconnect = async function() {
      let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      const a = await t.disconnectLock.lock();
      try {
        var o;
        if (t.state === "disconnected") {
          t.log.debug("already disconnected", t.logContext);
          return;
        }
        if (t.log.info("disconnect from room", h({}, t.logContext)), t.state === "connecting" || t.state === "reconnecting" || t.isResuming) {
          var c, d, l;
          t.log.warn("abort connection attempt", t.logContext), (c = t.abortController) === null || c === void 0 || c.abort(), (d = t.connectFuture) === null || d === void 0 || (l = d.reject) === null || l === void 0 || l.call(d, new L("Client initiated disconnect")), t.connectFuture = void 0;
        }
        (o = t.engine) !== null && o !== void 0 && o.client.isDisconnected || await t.engine.client.sendLeave(), t.engine && await t.engine.close(), t.handleDisconnect(r, ut.CLIENT_INITIATED), t.engine = void 0;
      } finally {
        a();
      }
    }, this.onPageLeave = async () => {
      this.log.info("Page leave detected, disconnecting", this.logContext), await this.disconnect();
    }, this.startAudio = async () => {
      const r = [], a = be();
      if (a && a.os === "iOS") {
        const o = "livekit-dummy-audio-el";
        let c = document.getElementById(o);
        if (!c) {
          c = document.createElement("audio"), c.id = o, c.autoplay = !0, c.hidden = !0;
          const d = si();
          d.enabled = !0;
          const l = new MediaStream([d]);
          c.srcObject = l, document.addEventListener("visibilitychange", () => {
            c && (c.srcObject = document.hidden ? null : l, document.hidden || (this.log.debug("page visible again, triggering startAudio to resume playback and update playback status", this.logContext), this.startAudio()));
          }), document.body.append(c), this.once(k.Disconnected, () => {
            var u;
            (u = c) === null || u === void 0 || u.remove(), c = null;
          });
        }
        r.push(c);
      }
      this.remoteParticipants.forEach((o) => {
        o.audioTrackPublications.forEach((c) => {
          c.track && c.track.attachedElements.forEach((d) => {
            r.push(d);
          });
        });
      });
      try {
        await Promise.all([this.acquireAudioContext(), ...r.map((o) => (o.muted = !1, o.play()))]), this.handleAudioPlaybackStarted();
      } catch (o) {
        throw this.handleAudioPlaybackFailed(o), o;
      }
    }, this.startVideo = async () => {
      const r = [];
      for (const a of this.remoteParticipants.values())
        a.videoTrackPublications.forEach((o) => {
          var c;
          (c = o.track) === null || c === void 0 || c.attachedElements.forEach((d) => {
            r.includes(d) || r.push(d);
          });
        });
      await Promise.all(r.map((a) => a.play())).then(() => {
        this.handleVideoPlaybackStarted();
      }).catch((a) => {
        a.name === "NotAllowedError" ? this.handleVideoPlaybackFailed() : this.log.warn("Resuming video playback failed, make sure you call `startVideo` directly in a user gesture handler", this.logContext);
      });
    }, this.handleRestarting = () => {
      this.clearConnectionReconcile(), this.isResuming = !1;
      for (const r of this.remoteParticipants.values())
        this.handleParticipantDisconnected(r.identity, r);
      this.setAndEmitConnectionState(
        "reconnecting"
        /* Reconnecting */
      ) && this.emit(k.Reconnecting);
    }, this.handleSignalRestarted = async (r) => {
      this.log.debug("signal reconnected to server, region ".concat(r.serverRegion), h(h({}, this.logContext), {}, {
        region: r.serverRegion
      })), this.bufferedEvents = [], this.applyJoinResponse(r);
      try {
        await this.localParticipant.republishAllTracks(void 0, !0);
      } catch (a) {
        this.log.error("error trying to re-publish tracks after reconnection", h(h({}, this.logContext), {}, {
          error: a
        }));
      }
      try {
        await this.engine.waitForRestarted(), this.log.debug("fully reconnected to server", h(h({}, this.logContext), {}, {
          region: r.serverRegion
        }));
      } catch {
        return;
      }
      this.setAndEmitConnectionState(
        "connected"
        /* Connected */
      ), this.emit(k.Reconnected), this.registerConnectionReconcile(), this.emitBufferedEvents();
    }, this.handleParticipantUpdates = (r) => {
      r.forEach((a) => {
        if (a.identity === this.localParticipant.identity) {
          this.localParticipant.updateInfo(a);
          return;
        }
        if (a.identity === "") {
          var o;
          a.identity = (o = this.sidToIdentity.get(a.sid)) !== null && o !== void 0 ? o : "";
        }
        let c = this.remoteParticipants.get(a.identity);
        a.state === hi.DISCONNECTED ? this.handleParticipantDisconnected(a.identity, c) : c = this.getOrCreateParticipant(a.identity, a);
      });
    }, this.handleActiveSpeakersUpdate = (r) => {
      const a = [], o = {};
      r.forEach((c) => {
        if (o[c.sid] = !0, c.sid === this.localParticipant.sid)
          this.localParticipant.audioLevel = c.level, this.localParticipant.setIsSpeaking(!0), a.push(this.localParticipant);
        else {
          const d = this.getRemoteParticipantBySid(c.sid);
          d && (d.audioLevel = c.level, d.setIsSpeaking(!0), a.push(d));
        }
      }), o[this.localParticipant.sid] || (this.localParticipant.audioLevel = 0, this.localParticipant.setIsSpeaking(!1)), this.remoteParticipants.forEach((c) => {
        o[c.sid] || (c.audioLevel = 0, c.setIsSpeaking(!1));
      }), this.activeSpeakers = a, this.emitWhenConnected(k.ActiveSpeakersChanged, a);
    }, this.handleSpeakersChanged = (r) => {
      const a = /* @__PURE__ */ new Map();
      this.activeSpeakers.forEach((c) => {
        a.set(c.sid, c);
      }), r.forEach((c) => {
        let d = this.getRemoteParticipantBySid(c.sid);
        c.sid === this.localParticipant.sid && (d = this.localParticipant), d && (d.audioLevel = c.level, d.setIsSpeaking(c.active), c.active ? a.set(c.sid, d) : a.delete(c.sid));
      });
      const o = Array.from(a.values());
      o.sort((c, d) => d.audioLevel - c.audioLevel), this.activeSpeakers = o, this.emitWhenConnected(k.ActiveSpeakersChanged, o);
    }, this.handleStreamStateUpdate = (r) => {
      r.streamStates.forEach((a) => {
        const o = this.getRemoteParticipantBySid(a.participantSid);
        if (!o)
          return;
        const c = o.getTrackPublicationBySid(a.trackSid);
        !c || !c.track || (c.track.streamState = v.streamStateFromProto(a.state), o.emit(C.TrackStreamStateChanged, c, c.track.streamState), this.emitWhenConnected(k.TrackStreamStateChanged, c, c.track.streamState, o));
      });
    }, this.handleSubscriptionPermissionUpdate = (r) => {
      const a = this.getRemoteParticipantBySid(r.participantSid);
      if (!a)
        return;
      const o = a.getTrackPublicationBySid(r.trackSid);
      o && o.setAllowed(r.allowed);
    }, this.handleSubscriptionError = (r) => {
      const a = Array.from(this.remoteParticipants.values()).find((c) => c.trackPublications.has(r.trackSid));
      if (!a)
        return;
      const o = a.getTrackPublicationBySid(r.trackSid);
      o && o.setSubscriptionError(r.err);
    }, this.handleDataPacket = (r, a) => {
      const o = this.remoteParticipants.get(r.participantIdentity);
      this.emit(k.DataReceived, r.payload, o, a, r.topic), o == null || o.emit(C.DataReceived, r.payload, a);
    }, this.handleAudioPlaybackStarted = () => {
      this.canPlaybackAudio || (this.audioEnabled = !0, this.emit(k.AudioPlaybackStatusChanged, !0));
    }, this.handleAudioPlaybackFailed = (r) => {
      this.log.warn("could not playback audio", h(h({}, this.logContext), {}, {
        error: r
      })), this.canPlaybackAudio && (this.audioEnabled = !1, this.emit(k.AudioPlaybackStatusChanged, !1));
    }, this.handleVideoPlaybackStarted = () => {
      this.isVideoPlaybackBlocked && (this.isVideoPlaybackBlocked = !1, this.emit(k.VideoPlaybackStatusChanged, !0));
    }, this.handleVideoPlaybackFailed = () => {
      this.isVideoPlaybackBlocked || (this.isVideoPlaybackBlocked = !0, this.emit(k.VideoPlaybackStatusChanged, !1));
    }, this.handleDeviceChange = async () => {
      this.emit(k.MediaDevicesChanged);
    }, this.handleRoomUpdate = (r) => {
      const a = this.roomInfo;
      this.roomInfo = r, a && a.metadata !== r.metadata && this.emitWhenConnected(k.RoomMetadataChanged, r.metadata), (a == null ? void 0 : a.activeRecording) !== r.activeRecording && this.emitWhenConnected(k.RecordingStatusChanged, r.activeRecording);
    }, this.handleConnectionQualityUpdate = (r) => {
      r.updates.forEach((a) => {
        if (a.participantSid === this.localParticipant.sid) {
          this.localParticipant.setConnectionQuality(a.quality);
          return;
        }
        const o = this.getRemoteParticipantBySid(a.participantSid);
        o && o.setConnectionQuality(a.quality);
      });
    }, this.onLocalParticipantMetadataChanged = (r) => {
      this.emit(k.ParticipantMetadataChanged, r, this.localParticipant);
    }, this.onLocalParticipantNameChanged = (r) => {
      this.emit(k.ParticipantNameChanged, r, this.localParticipant);
    }, this.onLocalTrackMuted = (r) => {
      this.emit(k.TrackMuted, r, this.localParticipant);
    }, this.onLocalTrackUnmuted = (r) => {
      this.emit(k.TrackUnmuted, r, this.localParticipant);
    }, this.onTrackProcessorUpdate = (r) => {
      var a;
      r == null || (a = r.onPublish) === null || a === void 0 || a.call(r, this);
    }, this.onLocalTrackPublished = async (r) => {
      var a, o, c, d;
      (a = r.track) === null || a === void 0 || a.on(T.TrackProcessorUpdate, this.onTrackProcessorUpdate), (o = r.track) === null || o === void 0 || (o = o.getProcessor()) === null || o === void 0 || (c = o.onPublish) === null || c === void 0 || c.call(o, this), this.emit(k.LocalTrackPublished, r, this.localParticipant), r.track instanceof W && await r.track.checkForSilence() && this.emit(k.LocalAudioSilenceDetected, r);
      const l = await ((d = r.track) === null || d === void 0 ? void 0 : d.getDeviceId()), u = Xo(r.source);
      u && l && l !== this.localParticipant.activeDeviceMap.get(u) && (this.localParticipant.activeDeviceMap.set(u, l), this.emit(k.ActiveDeviceChanged, u, l));
    }, this.onLocalTrackUnpublished = (r) => {
      var a;
      (a = r.track) === null || a === void 0 || a.off(T.TrackProcessorUpdate, this.onTrackProcessorUpdate), this.emit(k.LocalTrackUnpublished, r, this.localParticipant);
    }, this.onLocalConnectionQualityChanged = (r) => {
      this.emit(k.ConnectionQualityChanged, r, this.localParticipant);
    }, this.onMediaDevicesError = (r) => {
      this.emit(k.MediaDevicesError, r);
    }, this.onLocalParticipantPermissionsChanged = (r) => {
      this.emit(k.ParticipantPermissionsChanged, r, this.localParticipant);
    }, this.setMaxListeners(100), this.remoteParticipants = /* @__PURE__ */ new Map(), this.sidToIdentity = /* @__PURE__ */ new Map(), this.options = h(h({}, Dc), e), this.log = ve((n = this.options.loggerName) !== null && n !== void 0 ? n : de.Room), this.options.audioCaptureDefaults = h(h({}, xc), e == null ? void 0 : e.audioCaptureDefaults), this.options.videoCaptureDefaults = h(h({}, Mc), e == null ? void 0 : e.videoCaptureDefaults), this.options.publishDefaults = h(h({}, Ic), e == null ? void 0 : e.publishDefaults), this.maybeCreateEngine(), this.disconnectLock = new ne(), this.localParticipant = new pt("", "", this.engine, this.options), this.options.videoCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("videoinput", Te(this.options.videoCaptureDefaults.deviceId)), this.options.audioCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("audioinput", Te(this.options.audioCaptureDefaults.deviceId)), (s = this.options.audioOutput) !== null && s !== void 0 && s.deviceId && this.switchActiveDevice("audiooutput", Te(this.options.audioOutput.deviceId)).catch((r) => this.log.warn("Could not set audio output: ".concat(r.message), this.logContext)), this.options.e2ee && this.setupE2EE();
  }
  /**
   * @experimental
   */
  async setE2EEEnabled(e) {
    if (this.e2eeManager)
      await Promise.all([this.localParticipant.setE2EEEnabled(e)]), this.localParticipant.identity !== "" && this.e2eeManager.setParticipantCryptorEnabled(e, this.localParticipant.identity);
    else
      throw Error("e2ee not configured, please set e2ee settings within the room options");
  }
  setupE2EE() {
    if (this.options.e2ee) {
      var e;
      this.e2eeManager = new pc(this.options.e2ee), this.e2eeManager.on(Ee.ParticipantEncryptionStatusChanged, (t, n) => {
        n instanceof pt && (this.isE2EEEnabled = t), this.emit(k.ParticipantEncryptionStatusChanged, t, n);
      }), this.e2eeManager.on(Ee.EncryptionError, (t) => this.emit(k.EncryptionError, t)), (e = this.e2eeManager) === null || e === void 0 || e.setup(this);
    }
  }
  get logContext() {
    var e;
    return {
      room: this.name,
      roomID: (e = this.roomInfo) === null || e === void 0 ? void 0 : e.sid,
      participant: this.localParticipant.identity,
      pID: this.localParticipant.sid
    };
  }
  /**
   * if the current room has a participant with `recorder: true` in its JWT grant
   **/
  get isRecording() {
    var e, t;
    return (e = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.activeRecording) !== null && e !== void 0 ? e : !1;
  }
  /**
   * server assigned unique room id.
   * returns once a sid has been issued by the server.
   */
  async getSid() {
    return this.state === "disconnected" ? "" : this.roomInfo && this.roomInfo.sid !== "" ? this.roomInfo.sid : new Promise((e, t) => {
      const n = (s) => {
        s.sid !== "" && (this.engine.off(P.RoomUpdate, n), e(s.sid));
      };
      this.engine.on(P.RoomUpdate, n), this.once(k.Disconnected, () => {
        this.engine.off(P.RoomUpdate, n), t("Room disconnected before room server id was available");
      });
    });
  }
  /** user assigned name, derived from JWT token */
  get name() {
    var e, t;
    return (e = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.name) !== null && e !== void 0 ? e : "";
  }
  /** room metadata */
  get metadata() {
    var e;
    return (e = this.roomInfo) === null || e === void 0 ? void 0 : e.metadata;
  }
  get numParticipants() {
    var e, t;
    return (e = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.numParticipants) !== null && e !== void 0 ? e : 0;
  }
  get numPublishers() {
    var e, t;
    return (e = (t = this.roomInfo) === null || t === void 0 ? void 0 : t.numPublishers) !== null && e !== void 0 ? e : 0;
  }
  maybeCreateEngine() {
    this.engine && !this.engine.isClosed || (this.engine = new Hc(this.options), this.engine.on(P.ParticipantUpdate, this.handleParticipantUpdates).on(P.RoomUpdate, this.handleRoomUpdate).on(P.SpeakersChanged, this.handleSpeakersChanged).on(P.StreamStateChanged, this.handleStreamStateUpdate).on(P.ConnectionQualityUpdate, this.handleConnectionQualityUpdate).on(P.SubscriptionError, this.handleSubscriptionError).on(P.SubscriptionPermissionUpdate, this.handleSubscriptionPermissionUpdate).on(P.MediaTrackAdded, (e, t, n) => {
      this.onTrackAdded(e, t, n);
    }).on(P.Disconnected, (e) => {
      this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, e);
    }).on(P.ActiveSpeakersUpdate, this.handleActiveSpeakersUpdate).on(P.DataPacketReceived, this.handleDataPacket).on(P.Resuming, () => {
      this.clearConnectionReconcile(), this.isResuming = !0, this.log.info("Resuming signal connection", this.logContext);
    }).on(P.Resumed, () => {
      this.registerConnectionReconcile(), this.isResuming = !1, this.log.info("Resumed signal connection", this.logContext), this.updateSubscriptions(), this.emitBufferedEvents();
    }).on(P.SignalResumed, () => {
      this.bufferedEvents = [], (this.state === "reconnecting" || this.isResuming) && this.sendSyncState();
    }).on(P.Restarting, this.handleRestarting).on(P.SignalRestarted, this.handleSignalRestarted).on(P.Offline, () => {
      this.setAndEmitConnectionState(
        "reconnecting"
        /* Reconnecting */
      ) && this.emit(k.Reconnecting);
    }).on(P.DCBufferStatusChanged, (e, t) => {
      this.emit(k.DCBufferStatusChanged, e, t);
    }), this.localParticipant && this.localParticipant.setupEngine(this.engine), this.e2eeManager && this.e2eeManager.setupEngine(this.engine));
  }
  /**
   * getLocalDevices abstracts navigator.mediaDevices.enumerateDevices.
   * In particular, it handles Chrome's unique behavior of creating `default`
   * devices. When encountered, it'll be removed from the list of devices.
   * The actual default device will be placed at top.
   * @param kind
   * @returns a list of available local devices
   */
  static getLocalDevices(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return se.getInstance().getDevices(e, t);
  }
  /**
   * prepareConnection should be called as soon as the page is loaded, in order
   * to speed up the connection attempt. This function will
   * - perform DNS resolution and pre-warm the DNS cache
   * - establish TLS connection and cache TLS keys
   *
   * With LiveKit Cloud, it will also determine the best edge data center for
   * the current client to connect to if a token is provided.
   */
  async prepareConnection(e, t) {
    if (this.state === "disconnected") {
      this.log.debug("prepareConnection to ".concat(e), this.logContext);
      try {
        if (Mi(new URL(e)) && t) {
          this.regionUrlProvider = new jn(e, t);
          const n = await this.regionUrlProvider.getNextBestRegionUrl();
          n && this.state === "disconnected" && (this.regionUrl = n, await fetch(Mn(n), {
            method: "HEAD"
          }), this.log.debug("prepared connection to ".concat(n), this.logContext));
        } else
          await fetch(Mn(e), {
            method: "HEAD"
          });
      } catch (n) {
        this.log.warn("could not prepare connection", h(h({}, this.logContext), {}, {
          error: n
        }));
      }
    }
  }
  /**
   * retrieves a participant by identity
   * @param identity
   * @returns
   */
  getParticipantByIdentity(e) {
    return this.localParticipant.identity === e ? this.localParticipant : this.remoteParticipants.get(e);
  }
  clearConnectionFutures() {
    this.connectFuture = void 0;
  }
  /**
   * @internal for testing
   */
  async simulateScenario(e, t) {
    let n = () => {
    }, s;
    switch (e) {
      case "signal-reconnect":
        await this.engine.client.handleOnClose("simulate disconnect");
        break;
      case "speaker":
        s = new le({
          scenario: {
            case: "speakerUpdate",
            value: 3
          }
        });
        break;
      case "node-failure":
        s = new le({
          scenario: {
            case: "nodeFailure",
            value: !0
          }
        });
        break;
      case "server-leave":
        s = new le({
          scenario: {
            case: "serverLeave",
            value: !0
          }
        });
        break;
      case "migration":
        s = new le({
          scenario: {
            case: "migration",
            value: !0
          }
        });
        break;
      case "resume-reconnect":
        this.engine.failNext(), await this.engine.client.handleOnClose("simulate resume-disconnect");
        break;
      case "disconnect-signal-on-resume":
        n = async () => {
          await this.engine.client.handleOnClose("simulate resume-disconnect");
        }, s = new le({
          scenario: {
            case: "disconnectSignalOnResume",
            value: !0
          }
        });
        break;
      case "disconnect-signal-on-resume-no-messages":
        n = async () => {
          await this.engine.client.handleOnClose("simulate resume-disconnect");
        }, s = new le({
          scenario: {
            case: "disconnectSignalOnResumeNoMessages",
            value: !0
          }
        });
        break;
      case "full-reconnect":
        this.engine.fullReconnectOnNext = !0, await this.engine.client.handleOnClose("simulate full-reconnect");
        break;
      case "force-tcp":
      case "force-tls":
        s = new le({
          scenario: {
            case: "switchCandidateProtocol",
            value: e === "force-tls" ? 2 : 1
          }
        }), n = async () => {
          const r = this.engine.client.onLeave;
          r && r(new zt({
            reason: ut.CLIENT_INITIATED,
            canReconnect: !0
          }));
        };
        break;
      case "subscriber-bandwidth":
        if (t === void 0 || typeof t != "number")
          throw new Error("subscriber-bandwidth requires a number as argument");
        s = new le({
          scenario: {
            case: "subscriberBandwidth",
            value: BigInt(t)
          }
        });
        break;
    }
    s && (await this.engine.client.sendSimulateScenario(s), await n());
  }
  /**
   * Returns true if audio playback is enabled
   */
  get canPlaybackAudio() {
    return this.audioEnabled;
  }
  /**
   * Returns true if video playback is enabled
   */
  get canPlaybackVideo() {
    return !this.isVideoPlaybackBlocked;
  }
  getActiveDevice(e) {
    return this.localParticipant.activeDeviceMap.get(e);
  }
  /**
   * Switches all active devices used in this room to the given device.
   *
   * Note: setting AudioOutput is not supported on some browsers. See [setSinkId](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId#browser_compatibility)
   *
   * @param kind use `videoinput` for camera track,
   *  `audioinput` for microphone track,
   *  `audiooutput` to set speaker for all incoming audio tracks
   * @param deviceId
   */
  async switchActiveDevice(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, s = !1, r = !0;
    const a = n ? {
      exact: t
    } : t;
    if (e === "audioinput") {
      const u = this.options.audioCaptureDefaults.deviceId;
      this.options.audioCaptureDefaults.deviceId = a, s = u !== a;
      const p = Array.from(this.localParticipant.audioTrackPublications.values()).filter((f) => f.source === v.Source.Microphone);
      try {
        r = (await Promise.all(p.map((f) => {
          var b;
          return (b = f.audioTrack) === null || b === void 0 ? void 0 : b.setDeviceId(a);
        }))).every((f) => f === !0);
      } catch (f) {
        throw this.options.audioCaptureDefaults.deviceId = u, f;
      }
    } else if (e === "videoinput") {
      const u = this.options.videoCaptureDefaults.deviceId;
      this.options.videoCaptureDefaults.deviceId = a, s = u !== a;
      const p = Array.from(this.localParticipant.videoTrackPublications.values()).filter((f) => f.source === v.Source.Camera);
      try {
        r = (await Promise.all(p.map((f) => {
          var b;
          return (b = f.videoTrack) === null || b === void 0 ? void 0 : b.setDeviceId(a);
        }))).every((f) => f === !0);
      } catch (f) {
        throw this.options.videoCaptureDefaults.deviceId = u, f;
      }
    } else if (e === "audiooutput") {
      var o, c;
      if (!xi() && !this.options.webAudioMix || this.options.webAudioMix && this.audioContext && !("setSinkId" in this.audioContext))
        throw new Error("cannot switch audio output, setSinkId not supported");
      if (this.options.webAudioMix) {
        var d;
        t = (d = await se.getInstance().normalizeDeviceId("audiooutput", t)) !== null && d !== void 0 ? d : "";
      }
      (c = (o = this.options).audioOutput) !== null && c !== void 0 || (o.audioOutput = {});
      const u = this.options.audioOutput.deviceId;
      this.options.audioOutput.deviceId = t, s = u !== a;
      try {
        if (this.options.webAudioMix) {
          var l;
          (l = this.audioContext) === null || l === void 0 || l.setSinkId(t);
        } else
          await Promise.all(Array.from(this.remoteParticipants.values()).map((p) => p.setAudioOutput({
            deviceId: t
          })));
      } catch (p) {
        throw this.options.audioOutput.deviceId = u, p;
      }
    }
    return s && r && (this.localParticipant.activeDeviceMap.set(e, t), this.emit(k.ActiveDeviceChanged, e, t)), r;
  }
  setupLocalParticipantEvents() {
    this.localParticipant.on(C.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).on(C.ParticipantNameChanged, this.onLocalParticipantNameChanged).on(C.TrackMuted, this.onLocalTrackMuted).on(C.TrackUnmuted, this.onLocalTrackUnmuted).on(C.LocalTrackPublished, this.onLocalTrackPublished).on(C.LocalTrackUnpublished, this.onLocalTrackUnpublished).on(C.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).on(C.MediaDevicesError, this.onMediaDevicesError).on(C.AudioStreamAcquired, this.startAudio).on(C.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged);
  }
  recreateEngine() {
    var e;
    (e = this.engine) === null || e === void 0 || e.close(), this.engine = void 0, this.isResuming = !1, this.remoteParticipants.clear(), this.sidToIdentity.clear(), this.bufferedEvents = [], this.maybeCreateEngine();
  }
  onTrackAdded(e, t, n) {
    if (this.state === "connecting" || this.state === "reconnecting") {
      const l = () => {
        this.onTrackAdded(e, t, n), u();
      }, u = () => {
        this.off(k.Reconnected, l), this.off(k.Connected, l), this.off(k.Disconnected, u);
      };
      this.once(k.Reconnected, l), this.once(k.Connected, l), this.once(k.Disconnected, u);
      return;
    }
    if (this.state === "disconnected") {
      this.log.warn("skipping incoming track after Room disconnected", this.logContext);
      return;
    }
    const s = ic(t.id), r = s[0];
    let a = s[1], o = e.id;
    if (a && a.startsWith("TR") && (o = a), r === this.localParticipant.sid) {
      this.log.warn("tried to create RemoteParticipant for local participant", this.logContext);
      return;
    }
    const c = Array.from(this.remoteParticipants.values()).find((l) => l.sid === r);
    if (!c) {
      this.log.error("Tried to add a track for a participant, that's not present. Sid: ".concat(r), this.logContext);
      return;
    }
    let d;
    this.options.adaptiveStream && (typeof this.options.adaptiveStream == "object" ? d = this.options.adaptiveStream : d = {}), c.addSubscribedMediaTrack(e, o, t, n, d);
  }
  handleDisconnect() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, t = arguments.length > 1 ? arguments[1] : void 0;
    if (this.clearConnectionReconcile(), this.isResuming = !1, this.bufferedEvents = [], this.state !== "disconnected") {
      this.regionUrl = void 0;
      try {
        if (this.remoteParticipants.forEach((s) => {
          s.trackPublications.forEach((r) => {
            s.unpublishTrack(r.trackSid);
          });
        }), this.localParticipant.trackPublications.forEach((s) => {
          if (s.track && this.localParticipant.unpublishTrack(s.track, e), e) {
            var r, a;
            (r = s.track) === null || r === void 0 || r.detach(), (a = s.track) === null || a === void 0 || a.stop();
          }
        }), this.localParticipant.off(C.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).off(C.ParticipantNameChanged, this.onLocalParticipantNameChanged).off(C.TrackMuted, this.onLocalTrackMuted).off(C.TrackUnmuted, this.onLocalTrackUnmuted).off(C.LocalTrackPublished, this.onLocalTrackPublished).off(C.LocalTrackUnpublished, this.onLocalTrackUnpublished).off(C.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).off(C.MediaDevicesError, this.onMediaDevicesError).off(C.AudioStreamAcquired, this.startAudio).off(C.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged), this.localParticipant.trackPublications.clear(), this.localParticipant.videoTrackPublications.clear(), this.localParticipant.audioTrackPublications.clear(), this.remoteParticipants.clear(), this.sidToIdentity.clear(), this.activeSpeakers = [], this.audioContext && typeof this.options.webAudioMix == "boolean" && (this.audioContext.close(), this.audioContext = void 0), ee()) {
          var n;
          window.removeEventListener("beforeunload", this.onPageLeave), window.removeEventListener("pagehide", this.onPageLeave), window.removeEventListener("freeze", this.onPageLeave), (n = navigator.mediaDevices) === null || n === void 0 || n.removeEventListener("devicechange", this.handleDeviceChange);
        }
      } finally {
        this.setAndEmitConnectionState(
          "disconnected"
          /* Disconnected */
        ), this.emit(k.Disconnected, t);
      }
    }
  }
  handleParticipantDisconnected(e, t) {
    this.remoteParticipants.delete(e), t && (t.trackPublications.forEach((n) => {
      t.unpublishTrack(n.trackSid, !0);
    }), this.emit(k.ParticipantDisconnected, t));
  }
  async acquireAudioContext() {
    var e;
    if (typeof this.options.webAudioMix != "boolean" && this.options.webAudioMix.audioContext)
      this.audioContext = this.options.webAudioMix.audioContext;
    else if (!this.audioContext || this.audioContext.state === "closed") {
      var t;
      this.audioContext = (t = zi()) !== null && t !== void 0 ? t : void 0;
    }
    if (this.audioContext && this.audioContext.state === "suspended")
      try {
        await this.audioContext.resume();
      } catch (s) {
        this.log.warn("Could not resume audio context", h(h({}, this.logContext), {}, {
          error: s
        }));
      }
    this.options.webAudioMix && this.remoteParticipants.forEach((s) => s.setAudioContext(this.audioContext)), this.localParticipant.setAudioContext(this.audioContext);
    const n = ((e = this.audioContext) === null || e === void 0 ? void 0 : e.state) === "running";
    n !== this.canPlaybackAudio && (this.audioEnabled = n, this.emit(k.AudioPlaybackStatusChanged, n));
  }
  createParticipant(e, t) {
    var n;
    let s;
    return t ? s = $e.fromParticipantInfo(this.engine.client, t) : s = new $e(this.engine.client, "", e, void 0, void 0, {
      loggerContextCb: () => this.logContext,
      loggerName: this.options.loggerName
    }), this.options.webAudioMix && s.setAudioContext(this.audioContext), (n = this.options.audioOutput) !== null && n !== void 0 && n.deviceId && s.setAudioOutput(this.options.audioOutput).catch((r) => this.log.warn("Could not set audio output: ".concat(r.message), this.logContext)), s;
  }
  getOrCreateParticipant(e, t) {
    if (this.remoteParticipants.has(e)) {
      const s = this.remoteParticipants.get(e);
      return t && s.updateInfo(t) && this.sidToIdentity.set(t.sid, t.identity), s;
    }
    const n = this.createParticipant(e, t);
    return this.remoteParticipants.set(e, n), this.sidToIdentity.set(t.sid, t.identity), this.emitWhenConnected(k.ParticipantConnected, n), n.on(C.TrackPublished, (s) => {
      this.emitWhenConnected(k.TrackPublished, s, n);
    }).on(C.TrackSubscribed, (s, r) => {
      s.kind === v.Kind.Audio ? (s.on(T.AudioPlaybackStarted, this.handleAudioPlaybackStarted), s.on(T.AudioPlaybackFailed, this.handleAudioPlaybackFailed)) : s.kind === v.Kind.Video && (s.on(T.VideoPlaybackFailed, this.handleVideoPlaybackFailed), s.on(T.VideoPlaybackStarted, this.handleVideoPlaybackStarted)), this.emit(k.TrackSubscribed, s, r, n);
    }).on(C.TrackUnpublished, (s) => {
      this.emit(k.TrackUnpublished, s, n);
    }).on(C.TrackUnsubscribed, (s, r) => {
      this.emit(k.TrackUnsubscribed, s, r, n);
    }).on(C.TrackSubscriptionFailed, (s) => {
      this.emit(k.TrackSubscriptionFailed, s, n);
    }).on(C.TrackMuted, (s) => {
      this.emitWhenConnected(k.TrackMuted, s, n);
    }).on(C.TrackUnmuted, (s) => {
      this.emitWhenConnected(k.TrackUnmuted, s, n);
    }).on(C.ParticipantMetadataChanged, (s) => {
      this.emitWhenConnected(k.ParticipantMetadataChanged, s, n);
    }).on(C.ParticipantNameChanged, (s) => {
      this.emitWhenConnected(k.ParticipantNameChanged, s, n);
    }).on(C.ConnectionQualityChanged, (s) => {
      this.emitWhenConnected(k.ConnectionQualityChanged, s, n);
    }).on(C.ParticipantPermissionsChanged, (s) => {
      this.emitWhenConnected(k.ParticipantPermissionsChanged, s, n);
    }).on(C.TrackSubscriptionStatusChanged, (s, r) => {
      this.emitWhenConnected(k.TrackSubscriptionStatusChanged, s, r, n);
    }).on(C.TrackSubscriptionFailed, (s, r) => {
      this.emit(k.TrackSubscriptionFailed, s, n, r);
    }).on(C.TrackSubscriptionPermissionChanged, (s, r) => {
      this.emitWhenConnected(k.TrackSubscriptionPermissionChanged, s, r, n);
    }), t && n.updateInfo(t), n;
  }
  sendSyncState() {
    const e = Array.from(this.remoteParticipants.values()).reduce((n, s) => (n.push(...s.getTrackPublications()), n), []), t = this.localParticipant.getTrackPublications();
    this.engine.sendSyncState(e, t);
  }
  /**
   * After resuming, we'll need to notify the server of the current
   * subscription settings.
   */
  updateSubscriptions() {
    for (const e of this.remoteParticipants.values())
      for (const t of e.videoTrackPublications.values())
        t.isSubscribed && t instanceof Lr && t.emitTrackUpdate();
  }
  getRemoteParticipantBySid(e) {
    const t = this.sidToIdentity.get(e);
    if (t)
      return this.remoteParticipants.get(t);
  }
  registerConnectionReconcile() {
    this.clearConnectionReconcile();
    let e = 0;
    this.connectionReconcileInterval = Y.setInterval(() => {
      // ensure we didn't tear it down
      !this.engine || // engine detected close, but Room missed it
      this.engine.isClosed || // transports failed without notifying engine
      !this.engine.verifyTransport() ? (e++, this.log.warn("detected connection state mismatch", h(h({}, this.logContext), {}, {
        numFailures: e,
        engine: {
          closed: this.engine.isClosed,
          transportsConnected: this.engine.verifyTransport()
        }
      })), e >= 3 && (this.recreateEngine(), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, ut.STATE_MISMATCH))) : e = 0;
    }, $c);
  }
  clearConnectionReconcile() {
    this.connectionReconcileInterval && Y.clearInterval(this.connectionReconcileInterval);
  }
  setAndEmitConnectionState(e) {
    return e === this.state ? !1 : (this.state = e, this.emit(k.ConnectionStateChanged, this.state), !0);
  }
  emitBufferedEvents() {
    this.bufferedEvents.forEach((e) => {
      let [t, n] = e;
      this.emit(t, ...n);
    }), this.bufferedEvents = [];
  }
  emitWhenConnected(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    if (this.state === "reconnecting" || this.isResuming || !this.engine || this.engine.pendingReconnect)
      this.bufferedEvents.push([e, n]);
    else if (this.state === "connected")
      return this.emit(e, ...n);
    return !1;
  }
  /**
   * Allows to populate a room with simulated participants.
   * No actual connection to a server will be established, all state is
   * @experimental
   */
  async simulateParticipants(e) {
    const t = h({
      audio: !0,
      video: !0,
      useRealTracks: !1
    }, e.publish), n = h({
      count: 9,
      audio: !1,
      video: !0,
      aspectRatios: [1.66, 1.7, 1.3]
    }, e.participants);
    if (this.handleDisconnect(), this.roomInfo = new Oi({
      sid: "RM_SIMULATED",
      name: "simulated-room",
      emptyTimeout: 0,
      maxParticipants: 0,
      creationTime: j.parse((/* @__PURE__ */ new Date()).getTime()),
      metadata: "",
      numParticipants: 1,
      numPublishers: 1,
      turnPassword: "",
      enabledCodecs: [],
      activeRecording: !1
    }), this.localParticipant.updateInfo(new mt({
      identity: "simulated-local",
      name: "local-name"
    })), this.setupLocalParticipantEvents(), this.emit(k.SignalConnected), this.emit(k.Connected), this.setAndEmitConnectionState(
      "connected"
      /* Connected */
    ), t.video) {
      var s;
      const a = new jt(v.Kind.Video, new Be({
        source: H.CAMERA,
        sid: Math.floor(Math.random() * 1e4).toString(),
        type: re.AUDIO,
        name: "video-dummy"
      }), new Z(t.useRealTracks ? (await window.navigator.mediaDevices.getUserMedia({
        video: !0
      })).getVideoTracks()[0] : xn(160 * ((s = n.aspectRatios[0]) !== null && s !== void 0 ? s : 1), 160, !0, !0), void 0, !1, {
        loggerName: this.options.loggerName,
        loggerContextCb: () => this.logContext
      }), {
        loggerName: this.options.loggerName,
        loggerContextCb: () => this.logContext
      });
      this.localParticipant.addTrackPublication(a), this.localParticipant.emit(C.LocalTrackPublished, a);
    }
    if (t.audio) {
      const a = new jt(v.Kind.Audio, new Be({
        source: H.MICROPHONE,
        sid: Math.floor(Math.random() * 1e4).toString(),
        type: re.AUDIO
      }), new W(t.useRealTracks ? (await navigator.mediaDevices.getUserMedia({
        audio: !0
      })).getAudioTracks()[0] : si(), void 0, !1, this.audioContext, {
        loggerName: this.options.loggerName,
        loggerContextCb: () => this.logContext
      }), {
        loggerName: this.options.loggerName,
        loggerContextCb: () => this.logContext
      });
      this.localParticipant.addTrackPublication(a), this.localParticipant.emit(C.LocalTrackPublished, a);
    }
    for (let a = 0; a < n.count - 1; a += 1) {
      let o = new mt({
        sid: Math.floor(Math.random() * 1e4).toString(),
        identity: "simulated-".concat(a),
        state: hi.ACTIVE,
        tracks: [],
        joinedAt: j.parse(Date.now())
      });
      const c = this.getOrCreateParticipant(o.identity, o);
      if (n.video) {
        var r;
        const d = xn(160 * ((r = n.aspectRatios[a % n.aspectRatios.length]) !== null && r !== void 0 ? r : 1), 160, !1, !0), l = new Be({
          source: H.CAMERA,
          sid: Math.floor(Math.random() * 1e4).toString(),
          type: re.AUDIO
        });
        c.addSubscribedMediaTrack(d, l.sid, new MediaStream([d])), o.tracks = [...o.tracks, l];
      }
      if (n.audio) {
        const d = si(), l = new Be({
          source: H.MICROPHONE,
          sid: Math.floor(Math.random() * 1e4).toString(),
          type: re.AUDIO
        });
        c.addSubscribedMediaTrack(d, l.sid, new MediaStream([d])), o.tracks = [...o.tracks, l];
      }
      c.updateInfo(o);
    }
  }
  // /** @internal */
  emit(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    if (e !== k.ActiveSpeakersChanged) {
      const r = Nr(n).filter((a) => a !== void 0);
      this.log.debug("room event ".concat(e), h(h({}, this.logContext), {}, {
        event: e,
        args: r
      }));
    }
    return super.emit(e, ...n);
  }
}
function Nr(i) {
  return i.map((e) => {
    if (e)
      return Array.isArray(e) ? Nr(e) : typeof e == "object" ? "logContext" in e && e.logContext : e;
  });
}
const R = (i) => document.getElementById(i), $ = {
  isFrontFacing: !1,
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  defaultDevices: /* @__PURE__ */ new Map(),
  bitrateInterval: void 0,
  e2eeKeyProvider: new Bo()
};
let E, fe;
function Hn(i) {
  let e = "";
  for (var t = window.location.search.substring(1), n = t.split("&"), s = 0; s < n.length; s++) {
    var r = n[s].split("=");
    r[0] == i && (e = r[1]);
  }
  return e;
}
const $i = {
  connectWithFormInput: async () => {
    var i, e;
    const t = Hn("url"), n = Hn("token");
    console.log("url", "token", t, n);
    const s = R("simulcast").checked, r = R("dynacast").checked, a = R("force-turn").checked, o = R("adaptive-stream").checked, c = R("publish-option").checked, d = R("preferred-codec").value, l = R("scalability-mode").value, u = R("auto-subscribe").checked, p = R("audio-output").value;
    lo(xs.debug);
    const f = {
      adaptiveStream: o,
      dynacast: r,
      audioOutput: {
        deviceId: p
      },
      publishDefaults: {
        simulcast: s,
        videoSimulcastLayers: [me.h90, me.h216],
        videoCodec: d || "vp8",
        dtx: !0,
        red: !0,
        forceStereo: !1,
        screenShareEncoding: Jt.h1080fps30.encoding
      },
      videoCaptureDefaults: {
        resolution: me.h720.resolution
      },
      e2ee: void 0
    };
    (((i = f.publishDefaults) === null || i === void 0 ? void 0 : i.videoCodec) === "av1" || ((e = f.publishDefaults) === null || e === void 0 ? void 0 : e.videoCodec) === "vp9") && (f.publishDefaults.backupCodec = !0, l !== "" && (f.publishDefaults.scalabilityMode = void 0));
    const b = {
      autoSubscribe: u
    };
    a && (b.rtcConfig = {
      iceTransportPolicy: "relay"
    }), await $i.connectToRoom(t, n, f, b, c), $.bitrateInterval = setInterval(ed, 1e3);
  },
  connectToRoom: async (i, e, t, n, s) => {
    const r = new Ar(t);
    fe = Date.now(), await r.prepareConnection(i, e);
    const a = Date.now() - fe;
    D("prewarmed connection in ".concat(a, "ms")), r.on(k.ParticipantConnected, di).on(k.ParticipantDisconnected, Xc).on(k.DataReceived, Yc).on(k.Disconnected, Zc).on(k.Reconnecting, () => D("Reconnecting to room")).on(k.Reconnected, async () => {
      D("Successfully reconnected. server", await r.engine.getConnectedServerAddress());
    }).on(k.LocalTrackPublished, (o) => {
      const c = o.track;
      if (c instanceof W) {
        const {
          calculateVolume: d
        } = dc(c);
        setInterval(() => {
          var l;
          (l = R("local-volume")) === null || l === void 0 || l.setAttribute("value", d().toFixed(4));
        }, 200);
      }
      ie(r.localParticipant), we(), ct(r);
    }).on(k.LocalTrackUnpublished, () => {
      ie(r.localParticipant), we(), ct(r);
    }).on(k.RoomMetadataChanged, (o) => {
      D("new metadata for room", o);
    }).on(k.MediaDevicesChanged, Yi).on(k.AudioPlaybackStatusChanged, () => {
      if (r.canPlaybackAudio) {
        var o;
        (o = R("start-audio-button")) === null || o === void 0 || o.setAttribute("disabled", "true");
      } else {
        var c;
        (c = R("start-audio-button")) === null || c === void 0 || c.removeAttribute("disabled");
      }
    }).on(k.MediaDevicesError, (o) => {
      const c = qt.getFailure(o);
      D("media device failure", c);
    }).on(k.ConnectionQualityChanged, (o, c) => {
      D("connection quality changed", c == null ? void 0 : c.identity, o);
    }).on(k.TrackSubscribed, (o, c, d) => {
      D("subscribed to track", c.trackSid, d.identity), ie(d), ct(r);
    }).on(k.TrackUnsubscribed, (o, c, d) => {
      D("unsubscribed from track", c.trackSid), ie(d), ct(r);
    }).on(k.SignalConnected, async () => {
      const o = Date.now() - fe;
      D("signal connection established in ".concat(o, "ms")), s && (await r.localParticipant.enableCameraAndMicrophone(), D("tracks published in ".concat(Date.now() - fe, "ms")), we());
    }).on(k.ParticipantEncryptionStatusChanged, () => {
      we();
    }).on(k.TrackStreamStateChanged, (o, c, d) => {
      D("stream state changed for ".concat(o.trackSid, " (").concat(d.identity, ") to ").concat(c.toString()));
    });
    try {
      const o = R("crypto-key").value;
      $.e2eeKeyProvider.setKey(o), R("e2ee").checked && await r.setE2EEEnabled(!0), await r.connect(i, e, n);
      const c = Date.now() - fe;
      D("successfully connected to ".concat(r.name, " in ").concat(Math.round(c), "ms"), await r.engine.getConnectedServerAddress());
    } catch (o) {
      let c = o;
      o.message && (c = o.message), D("could not connect:", c);
      return;
    }
    return E = r, window.currentRoom = r, Ur(!0), r.remoteParticipants.forEach((o) => {
      di(o);
    }), di(r.localParticipant), r;
  },
  toggleE2EE: async () => {
    if (!E || !E.options.e2ee)
      return;
    const i = R("crypto-key").value;
    $.e2eeKeyProvider.setKey(i), await E.setE2EEEnabled(!E.isE2EEEnabled);
  },
  ratchetE2EEKey: async () => {
    !E || !E.options.e2ee || await $.e2eeKeyProvider.ratchetKey();
  },
  toggleAudio: async () => {
    if (!E)
      return;
    const i = E.localParticipant.isMicrophoneEnabled;
    Ue("toggle-audio-button", !0), D(i ? "disabling audio" : "enabling audio"), await E.localParticipant.setMicrophoneEnabled(!i), Ue("toggle-audio-button", !1), we();
  },
  toggleVideo: async () => {
    if (!E)
      return;
    Ue("toggle-video-button", !0);
    const i = E.localParticipant.isCameraEnabled;
    D(i ? "disabling video" : "enabling video"), await E.localParticipant.setCameraEnabled(!i), Ue("toggle-video-button", !1), ie(E.localParticipant), we();
  },
  flipVideo: () => {
    var i, e;
    const t = (i = E) === null || i === void 0 ? void 0 : i.localParticipant.getTrackPublication(v.Source.Camera);
    if (!t)
      return;
    $.isFrontFacing ? qe("flip-video-button", "Front Camera", !1) : qe("flip-video-button", "Back Camera", !1), $.isFrontFacing = !$.isFrontFacing;
    const n = {
      resolution: me.h720.resolution,
      facingMode: $.isFrontFacing ? "user" : "environment"
    };
    (e = t.videoTrack) === null || e === void 0 || e.restartTrack(n);
  },
  shareScreen: async () => {
    if (!E)
      return;
    const i = E.localParticipant.isScreenShareEnabled;
    D("".concat(i ? "stopping" : "starting", " screen share")), Ue("share-screen-button", !0);
    try {
      await E.localParticipant.setScreenShareEnabled(!i, {
        audio: !0
      });
    } catch (e) {
      D("error sharing screen", e);
    }
    Ue("share-screen-button", !1), we();
  },
  startAudio: () => {
    var i;
    (i = E) === null || i === void 0 || i.startAudio();
  },
  enterText: () => {
    if (!E)
      return;
    const i = R("entry");
    if (i.value) {
      const e = $.encoder.encode(i.value);
      E.localParticipant.publishData(e, {
        reliable: !0
      }), R("chat").value += "".concat(E.localParticipant.identity, " (me): ").concat(i.value, `
`), i.value = "";
    }
  },
  disconnectRoom: () => {
    E && E.disconnect(), $.bitrateInterval && clearInterval($.bitrateInterval);
  },
  handleScenario: (i) => {
    const e = i.target.value;
    if (e === "subscribe-all") {
      var t;
      (t = E) === null || t === void 0 || t.remoteParticipants.forEach((r) => {
        r.trackPublications.forEach((a) => a.setSubscribed(!0));
      });
    } else if (e === "unsubscribe-all") {
      var n;
      (n = E) === null || n === void 0 || n.remoteParticipants.forEach((r) => {
        r.trackPublications.forEach((a) => a.setSubscribed(!1));
      });
    } else if (e !== "") {
      var s;
      (s = E) === null || s === void 0 || s.simulateScenario(e), i.target.value = "";
    }
  },
  handleDeviceSelected: async (i) => {
    const e = i.target.value, t = i.target.id, n = Ai[t];
    n && ($.defaultDevices.set(n, e), E && await E.switchActiveDevice(n, e));
  },
  handlePreferredQuality: (i) => {
    const e = i.target.value;
    let t = Q.HIGH;
    switch (e) {
      case "low":
        t = Q.LOW;
        break;
      case "medium":
        t = Q.MEDIUM;
        break;
      case "high":
        t = Q.HIGH;
        break;
    }
    E && E.remoteParticipants.forEach((n) => {
      n.trackPublications.forEach((s) => {
        s.setVideoQuality(t);
      });
    });
  },
  handlePreferredFPS: (i) => {
    const e = +i.target.value;
    E && E.remoteParticipants.forEach((t) => {
      t.trackPublications.forEach((n) => {
        n.setVideoFPS(e);
      });
    });
  }
};
setTimeout(() => {
  $i.connectWithFormInput();
}, 3e3);
window.appActions = $i;
function Yc(i, e) {
  const t = $.decoder.decode(i), n = R("chat");
  let s = "server";
  e && (s = e.identity), n.value += "".concat(s, ": ").concat(t, `
`);
}
function di(i) {
  D("participant", i.identity, "connected", i.metadata), console.log("tracks", i.trackPublications), i.on(C.TrackMuted, (e) => {
    D("track was muted", e.trackSid, i.identity), ie(i);
  }).on(C.TrackUnmuted, (e) => {
    D("track was unmuted", e.trackSid, i.identity), ie(i);
  }).on(C.IsSpeakingChanged, () => {
    ie(i);
  }).on(C.ConnectionQualityChanged, () => {
    ie(i);
  });
}
function Xc(i) {
  D("participant", i.sid, "disconnected"), ie(i, !0);
}
function Zc(i) {
  if (!E)
    return;
  D("disconnected from room", {
    reason: i
  }), Ur(!1), ie(E.localParticipant, !0), E.remoteParticipants.forEach((n) => {
    ie(n, !0);
  }), ct(E);
  const e = R("participants-area");
  e && (e.innerHTML = "");
  const t = R("chat");
  t.value = "", E = void 0, window.currentRoom = void 0;
}
function D() {
  for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
    e[t] = arguments[t];
  const n = R("log");
  for (let s = 0; s < arguments.length; s += 1)
    typeof e[s] == "object" ? n.innerHTML += "".concat(JSON && JSON.stringify ? JSON.stringify(e[s], void 0, 2) : e[s], " ") : n.innerHTML += "".concat(e[s], " ");
  n.innerHTML += `
`, n.scrollTop = n.scrollHeight;
}
function ie(i) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  const t = R("participants-area");
  if (!t)
    return;
  const {
    identity: n
  } = i;
  let s = R("participant-".concat(n));
  if (!s && !e) {
    s = document.createElement("div"), s.id = "participant-".concat(n), s.className = "participant", s.innerHTML = `
      <video id="video-`.concat(n, `"></video>
      <audio id="audio-`).concat(n, `"></audio>
      <div class="info-bar">
        <div id="name-`).concat(n, `" class="name">
        </div>
        <div style="text-align: center;">
          <span id="codec-`).concat(n, `" class="codec">
          </span>
          <span id="size-`).concat(n, `" class="size">
          </span>
          <span id="bitrate-`).concat(n, `" class="bitrate">
          </span>
        </div>
        <div class="right">
          <span id="signal-`).concat(n, `"></span>
          <span id="mic-`).concat(n, `" class="mic-on"></span>
          <span id="e2ee-`).concat(n, `" class="e2ee-on"></span>
        </div>
      </div>
      `).concat(i instanceof $e ? `<div class="volume-control">
        <input id="volume-`.concat(n, `" type="range" min="0" max="1" step="0.1" value="1" orient="vertical" />
      </div>`) : '<progress id="local-volume" max="1" value="0" />', `

    `), t.appendChild(s);
    const U = R("size-".concat(n)), V = R("video-".concat(n));
    V.onresize = () => {
      Or(V, U);
    };
  }
  const r = R("video-".concat(n)), a = R("audio-".concat(n));
  if (e) {
    var o;
    (o = s) === null || o === void 0 || o.remove(), r && (r.srcObject = null, r.src = ""), a && (a.srcObject = null, a.src = "");
    return;
  }
  R("name-".concat(n)).innerHTML = i.identity, i instanceof pt && (R("name-".concat(n)).innerHTML += " (you)");
  const c = R("mic-".concat(n)), d = R("signal-".concat(n)), l = i.getTrackPublication(v.Source.Camera), u = i.getTrackPublication(v.Source.Microphone);
  if (i.isSpeaking ? s.classList.add("speaking") : s.classList.remove("speaking"), i instanceof $e && R("volume-".concat(n)).addEventListener("input", (V) => {
    i.setVolume(Number.parseFloat(V.target.value));
  }), l && l.isSubscribed && !l.isMuted) {
    var f, b;
    if (i instanceof pt)
      r.style.transform = "scale(-1, 1)";
    else if (!(l != null && (f = l.videoTrack) !== null && f !== void 0 && f.attachedElements.includes(r))) {
      const U = Date.now();
      r.onloadeddata = () => {
        const V = Date.now() - U;
        let q = 0;
        i.joinedAt && i.joinedAt.getTime() < fe && (q = Date.now() - fe), D("RemoteVideoTrack ".concat(l == null ? void 0 : l.trackSid, " (").concat(r.videoWidth, "x").concat(r.videoHeight, ") rendered in ").concat(V, "ms"), q > 0 ? ", ".concat(q, "ms from start") : "");
      };
    }
    l == null || (b = l.videoTrack) === null || b === void 0 || b.attach(r);
  } else if (R("size-".concat(n)).innerHTML = "", l != null && l.videoTrack) {
    var y;
    (y = l.videoTrack) === null || y === void 0 || y.detach(r);
  } else
    r.src = "", r.srcObject = null;
  if (u && u.isSubscribed && !u.isMuted) {
    if (!(i instanceof pt)) {
      var S;
      a.onloadeddata = () => {
        if (i.joinedAt && i.joinedAt.getTime() < fe) {
          const U = Date.now() - fe;
          D("RemoteAudioTrack ".concat(u == null ? void 0 : u.trackSid, " played ").concat(U, "ms from start"));
        }
      }, u == null || (S = u.audioTrack) === null || S === void 0 || S.attach(a);
    }
    c.className = "mic-on", c.innerHTML = '<i class="fas fa-microphone"></i>';
  } else
    c.className = "mic-off", c.innerHTML = '<i class="fas fa-microphone-slash"></i>';
  const N = R("e2ee-".concat(n));
  switch (i.isEncrypted ? (N.className = "e2ee-on", N.innerHTML = '<i class="fas fa-lock"></i>') : (N.className = "e2ee-off", N.innerHTML = '<i class="fas fa-unlock"></i>'), i.connectionQuality) {
    case Ft.Excellent:
    case Ft.Good:
    case Ft.Poor:
      d.className = "connection-".concat(i.connectionQuality), d.innerHTML = '<i class="fas fa-circle"></i>';
      break;
    default:
      d.innerHTML = "";
  }
}
function ct(i) {
  const e = R("screenshare-area");
  if (i.state !== $t.Connected) {
    e.style.display = "none";
    return;
  }
  let t, n = i.localParticipant.getTrackPublication(v.Source.ScreenShare), s;
  if (n ? t = i.localParticipant : i.remoteParticipants.forEach((o) => {
    if (n)
      return;
    t = o;
    const c = o.getTrackPublication(v.Source.ScreenShare);
    c != null && c.isSubscribed && (n = c);
    const d = o.getTrackPublication(v.Source.ScreenShareAudio);
    d != null && d.isSubscribed && (s = d);
  }), n && t) {
    var r;
    e.style.display = "block";
    const o = R("screenshare-video");
    if ((r = n.videoTrack) === null || r === void 0 || r.attach(o), s) {
      var a;
      (a = s.audioTrack) === null || a === void 0 || a.attach(o);
    }
    o.onresize = () => {
      Or(o, R("screenshare-resolution"));
    };
    const c = R("screenshare-info");
    c.innerHTML = "Screenshare from ".concat(t.identity);
  } else
    e.style.display = "none";
}
function ed() {
  if (!E || E.state !== $t.Connected)
    return;
  const i = [...E.remoteParticipants.values()];
  i.push(E.localParticipant);
  for (const t of i) {
    const n = R("bitrate-".concat(t.identity));
    let s = 0;
    for (const a of t.trackPublications.values())
      if (a.track && (s += a.track.currentBitrate), a.source === v.Source.Camera && a.videoTrack instanceof We) {
        var e;
        const o = R("codec-".concat(t.identity));
        o.innerHTML = (e = a.videoTrack.getDecoderImplementation()) !== null && e !== void 0 ? e : "";
      }
    let r = "";
    s > 0 && (r = "".concat(Math.round(s / 1024).toLocaleString(), " kbps")), n && (n.innerHTML = r);
  }
}
function Or(i, e) {
  e.innerHTML = "(".concat(i.videoWidth, "x").concat(i.videoHeight, ")");
}
function qe(i, e, t) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : void 0;
  const s = R(i);
  s && (n !== void 0 && (s.disabled = n), s.innerHTML = e, t ? s.classList.add("active") : s.classList.remove("active"));
}
function Ue(i, e) {
  const t = R(i);
  t.disabled = e;
}
setTimeout(Yi, 100);
function Ur(i) {
  const e = ["toggle-video-button", "toggle-audio-button", "share-screen-button", "disconnect-ws-button", "disconnect-room-button", "flip-video-button", "send-button"];
  E && E.options.e2ee && e.push("toggle-e2ee-button", "e2ee-ratchet-button");
  const t = ["connect-button"], n = i ? e : t, s = i ? t : e;
  n.forEach((r) => {
    var a;
    return (a = R(r)) === null || a === void 0 ? void 0 : a.removeAttribute("disabled");
  }), s.forEach((r) => {
    var a;
    return (a = R(r)) === null || a === void 0 ? void 0 : a.setAttribute("disabled", "true");
  });
}
const Ai = {
  "video-input": "videoinput",
  "audio-input": "audioinput",
  "audio-output": "audiooutput"
};
async function Yi() {
  Promise.all(Object.keys(Ai).map(async (i) => {
    const e = Ai[i];
    if (!e)
      return;
    const t = await Ar.getLocalDevices(e), n = R(i);
    td(n, t, $.defaultDevices.get(e));
  }));
}
function td(i, e, t) {
  i.innerHTML = "";
  for (const n of e) {
    const s = document.createElement("option");
    s.text = n.label, s.value = n.deviceId, n.deviceId === t && (s.selected = !0), i.appendChild(s);
  }
}
function we() {
  if (!E)
    return;
  const i = E.localParticipant;
  qe("toggle-video-button", "".concat(i.isCameraEnabled ? "Disable" : "Enable", " Video"), i.isCameraEnabled), qe("toggle-audio-button", "".concat(i.isMicrophoneEnabled ? "Disable" : "Enable", " Audio"), i.isMicrophoneEnabled), qe("share-screen-button", i.isScreenShareEnabled ? "Stop Screen Share" : "Share Screen", i.isScreenShareEnabled), qe("toggle-e2ee-button", "".concat(E.isE2EEEnabled ? "Disable" : "Enable", " E2EE"), E.isE2EEEnabled);
}
async function id() {
  Yi();
}
function nd() {
  const i = R("preferred-codec"), e = [["", "Preferred codec"], ["h264", "H.264"], ["vp8", "VP8"]];
  Tr() && e.push(["vp9", "VP9"]), yr() && e.push(["av1", "AV1"]);
  for (const t of e) {
    const n = document.createElement("option");
    n.value = t[0], n.appendChild(document.createTextNode(t[1])), i.appendChild(n);
  }
}
function sd() {
  const i = R("scalability-mode"), e = ["L1T1", "L1T2", "L1T3", "L2T1", "L2T1h", "L2T1_KEY", "L2T2", "L2T2h", "L2T2_KEY", "L2T3", "L2T3h", "L2T3_KEY", "L3T1", "L3T1h", "L3T1_KEY", "L3T2", "L3T2h", "L3T2_KEY", "L3T3", "L3T3h", "L3T3_KEY"];
  let t = document.createElement("option");
  t.value = "", t.text = "ScalabilityMode", i.appendChild(t);
  for (const s of e)
    t = document.createElement("option"), t.value = s, t.text = s, i.appendChild(t);
  const n = R("preferred-codec");
  n.onchange = () => {
    gt(n.value) ? i.removeAttribute("disabled") : i.setAttribute("disabled", "true");
  };
}
id();
nd();
sd();
