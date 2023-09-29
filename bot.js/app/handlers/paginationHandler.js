async function handlePagination(client, interaction, currentPage, totalPages) {
  const buttonId = interaction.customId;
  let newPage = currentPage;

  if (buttonId === "prev" && currentPage > 1) {
    newPage--;
  } else if (buttonId === "next" && currentPage < totalPages) {
    newPage++;
  }

  sendHelpPage(client, interaction, newPage, totalPages);
}
