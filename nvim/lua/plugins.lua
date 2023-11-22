return {
	{ "folke/which-key.nvim" },
	{ "folke/neodev.nvim", 
		cmd = "Neoconf" 
	},
	{ "nvim-treesitter/nvim-treesitter", 
		cmd = "TSUpdate" 
	},
	{ "windwp/nvim-autopairs", 
		event = "InsertEnter", 
		opts = {} 
	},
	"nvim-lua/plenary.nvim",
	{ "nvim-telescope/telescope.nvim", 
		branch = "0.1.x" 
	},
	{ 'nvim-telescope/telescope-fzf-native.nvim', 
		build = 'cmake -S. -Bbuild -DCMAKE_BUILD_TYPE=Release && cmake --build build --config Release && cmake --install build --prefix build'
	},
	{ "nvim-tree/nvim-web-devicons", 
		opt = true
	},
	"nyoom-engineering/oxocarbon.nvim",
	"nvim-lualine/lualine.nvim",
	"williamboman/mason.nvim",
    	"williamboman/mason-lspconfig.nvim",
	"neovim/nvim-lspconfig",
	"ms-jpq/coq_nvim",
	"ms-jpq/coq.artifacts",
	"ms-jpq/coq.thirdparty",
	"norcalli/nvim-colorizer.lua"
}
