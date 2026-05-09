export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).end();
  
  const data = req.body;
  if (data.type === 1) return res.status(200).json({ type: 1 });

  if (data.type === 2) {
    const cmd = data.data.name;
    const r = {
      "ficha": "Ficha: Josuke Higashikata | Stand: Crazy Diamond",
      "stand": "Você sorteou: 『KILLER QUEEN』 💣",
      "classe": "Roleta: Você tirou VAMPIRO 🧛",
      "duelo": "DUELO BIZARRO INICIADO!",
      "lore": "Lore: O cadáver santo está em Morioh...",
      "ban": "King Crimson! Apagado do tempo.",
      "mute": "THE WORLD! Silenciado.",
      "say": "Tomura: Use /say mensagem: seu texto",
      "decay": "Tudo que eu toco... decai... *virou pó* 💀"
    };
    return res.status(200).json({ type: 4, data: { content: r[cmd] || "OK" }});
  }
}