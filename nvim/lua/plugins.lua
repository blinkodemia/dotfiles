return {
	{ "folke/which-key.nvim" },
	{ "folke/neodev.nvim", cmd = "Neoconf" },
	{ "nvim-treesitter/nvim-treesitter", cmd = "TSUpdate" },
	{ "windwp/nvim-autopairs", event = "InsertEnter", opts = {} },
	"nvim-lua/plenary.nvim",
	{ "nvim-telescope/telescope.nvim", branch = "0.1.x" },
	{
		"nvim-telescope/telescope-fzf-native.nvim",
		build = "cmake -S. -Bbuild -DCMAKE_BUILD_TYPE=Release && cmake --build build --config Release && cmake --install build --prefix build",
	},
	{ "nvim-tree/nvim-web-devicons", opt = true },
	"nyoom-engineering/oxocarbon.nvim",
	"nvim-lualine/lualine.nvim",
	"williamboman/mason.nvim",
	"williamboman/mason-lspconfig.nvim",
	"neovim/nvim-lspconfig",
	"ms-jpq/coq_nvim",
	"ms-jpq/coq.artifacts",
	"ms-jpq/coq.thirdparty",
	"norcalli/nvim-colorizer.lua",
	{ "stevearc/conform.nvim", event = { "BufReadPre", "BufNewFile" } },
	{
		"mfussenegger/nvim-lint",
		event = { "BufReadPre", "BufNewFile" },

		config = function()
			local lint = require("lint")

			lint.linters_by_ft = {
				javascript = { "eslint_d" },
				typescript = { "eslint_d" },
				javascriptreact = { "eslint_d" },
				typescriptreact = { "eslint_d" },
				svelte = { "eslint_d" },
				python = { "pylint" },
			}
			local lint_augroup = vim.api.nvim_create_augroup("lint", { clear = true })

			vim.api.nvim_create_autocmd({ "BufEnter", "BufWritePost", "InsertLeave" }, {
				group = lint_augroup,
				callback = function()
					lint.try_lint()
				end,
			})
			vim.keymap.set("n", "<leader>l", function()
				lint.try_lint()
			end, { desc = "Trigger linting for current file" })
		end,
	},
	{
		"nvimdev/dashboard-nvim",
		event = "VimEnter",
	},
	{ "ms-jpq/chadtree", branch = "chad", build = "python3 -m chadtree deps" },
	"yamatsum/nvim-cursorline",
	"andweeb/presence.nvim",
	"akinsho/bufferline.nvim",
	"nvim-orgmode/orgmode",
	"ellisonleao/glow.nvim",
}
