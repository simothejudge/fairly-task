let annotations = [];
const SUPABASE_URL = "https://aobseuwycuwdodkhvgkp.supabase.co";
const SUPABASE_KEY = "sb_publishable_83EcrQ4Bai8W6owROHfrPQ_5bj49aMs";
const session_id = crypto.randomUUID();


function saveAnnotation(original, corrected) {
  annotations.push({
    original: original,
    corrected: corrected
  });

  console.log(annotations);
}

document.getElementById("text").addEventListener("mouseup", function () {
  let selection = window.getSelection();
  let selectedText = selection.toString();
  
  if (selection.rangeCount === 0) return;

  if (selectedText.length > 0 && selection.rangeCount > 0) {
    let replacement = prompt("Come lo riscriveresti?");

    if (replacement) {
      let range = selection.getRangeAt(0);

      let span = document.createElement("span");
      span.className = "highlight";
      span.textContent = replacement;

      range.deleteContents();
      range.insertNode(span);

      annotations.push({
        original: selectedText,
        corrected: replacement
      });

      selection.removeAllRanges();
    }
  }
});
async function submitData() {

  const email = document.getElementById("email").value;

  // Controllo email
  if (!email) {
    alert("Inserisci la tua email prima di inviare.");
    return;
  }

  try {

    for (let ann of annotations) {

      await fetch(`${SUPABASE_URL}/rest/v1/annotations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({
          original: ann.original,
          corrected: ann.corrected,
          email: email,
          session_id: session_id,
          timestamp: new Date().toISOString()
        })
      });

    }

    // Messaggio + redirect
    alert(
      "Grazie del tuo contributo!\n\nSiamo circa a metà.\nOra procediamo alla compilazione del questionario della durata di pochi minuti."
    );
    
    window.location.href = "https://TUO-LINK";

  } catch (error) {
    console.error("Errore nel salvataggio:", error);
    alert("Si è verificato un errore. Riprova.");
  }
}
