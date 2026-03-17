let annotations = [];
const SUPABASE_URL = "https://aobseuwycuwdodkhvgkp.supabase.co";
const SUPABASE_KEY = "sb_publishable_83EcrQ4Bai8W6owROHfrPQ_5bj49aMs";

document.getElementById("text").addEventListener("mouseup", function () {
  let selection = window.getSelection();
  let selectedText = selection.toString();

  if (selectedText.length > 0) {
    let replacement = prompt("Come lo riscriveresti?");

    if (replacement) {
      saveAnnotation(selectedText, replacement);
      highlightSelection();
    }
  }
});

function saveAnnotation(original, corrected) {
  annotations.push({
    original: original,
    corrected: corrected
  });

  console.log(annotations);
}

function highlightSelection() {
  let selection = window.getSelection();
  let range = selection.getRangeAt(0);

  let span = document.createElement("span");
  span.className = "highlight";

  range.surroundContents(span);

  selection.removeAllRanges();
}

async function submitData() {
  await fetch(`${SUPABASE_URL}/rest/v1/annotations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify(annotations)
  });

  alert("Grazie!");
}