module.exports = {
    name: 'sheesh',
    description: 'Test Stuff!',
    execute(message) {
      let roles = message.guild.roles.cache;
  
      for (const [roleid, role] of roles) {
        role.permissions.remove("READ_MESSAGE_HISTORY")
      }
    },
  };