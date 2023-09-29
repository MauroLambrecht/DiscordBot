const { Schema, model } = require("mongoose");

const warnings = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  moderatorId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const member = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  xpMultiplier: {
    type: Number,
    default: 1,
  },
  xpBoostExpiration: {
    type: Date,
    default: null,
  },
  xpPenaltyExpiration: {
    type: Date,
    default: null,
  },
  balance: {
    type: Number,
    default: 0,
  },
  bank: {
    type: Number,
    default: 0,
  },
  last_worked: {
    type: Date,
  },
  married_to: {
    type: String,
    default: null,
  },
  married: {
    type: Boolean,
    default: false,
  },
  muted: {
    type: Boolean,
    default: false,
  },
  warnings: {
    type: warnings,
    default: () => ({}),
  },

  interactions: {
    hug: {
      type: Number,
      default: 0,
    },
    pat: {
      type: Number,
      default: 0,
    },
    poke: {
      type: Number,
      default: 0,
    },
    kiss: {
      type: Number,
      default: 0,
    },
    wave: {
      type: Number,
      default: 0,
    },
    slap: {
      type: Number,
      default: 0,
    },
    highfive: {
      type: Number,
      default: 0,
    },
    smile: {
      type: Number,
      default: 0,
    },
    cry: {
      type: Number,
      default: 0,
    },
    laugh: {
      type: Number,
      default: 0,
    },
    dance: {
      type: Number,
      default: 0,
    },
    cheer: {
      type: Number,
      default: 0,
    },
    greet: {
      type: Number,
      default: 0,
    },
    compliment: {
      type: Number,
      default: 0,
    },
    insult: {
      type: Number,
      default: 0,
    },
    blush: {
      type: Number,
      default: 0,
    },
    confused: {
      type: Number,
      default: 0,
    },
    angry: {
      type: Number,
      default: 0,
    },
    love: {
      type: Number,
      default: 0,
    },
    thank: {
      type: Number,
      default: 0,
    },
    shrug: {
      type: Number,
      default: 0,
    },
    surprised: {
      type: Number,
      default: 0,
    },
    bored: {
      type: Number,
      default: 0,
    },
    point: {
      type: Number,
      default: 0,
    },
    handshake: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = model("Member", member);
