# match

Literal ::= Number | Boolean | undefined | null | String | Function
Wildcard ::= _
Datum   ::= Wildcard | Literal | Identifier | [Datum *] | { String: Datum }
