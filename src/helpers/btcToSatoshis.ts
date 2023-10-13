export default function btcToSatoshis(btc) {
  return Math.round(btc * 1e8);
}
