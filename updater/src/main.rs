#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")] // hide console window on Windows in release

use eframe::egui;
use egui::{Color32, Spinner};

fn main() {
    tracing_subscriber::fmt::init();

    let options = eframe::NativeOptions {
        initial_window_size: Some(egui::vec2(320.0, 140.0)),
        centered: true,
        resizable: false,
        decorated: false,
        ..Default::default()
    };
    eframe::run_native(
        "Select Launcher | Updater",
        options,
        Box::new(|_cc| Box::new(Updater::default())),
    )
}

struct Updater {}

impl Default for Updater {
    fn default() -> Self {
        Self {}
    }
}

impl eframe::App for Updater {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.vertical_centered(|ui| {
                ui.heading("Select Launcher | Updater");
                ui.label("Please wait while we check for updates!")
            });
            ui.spacing();
            ui.centered_and_justified(|ui| {
                ui.add(
                    Spinner::new()
                        .size(50_f32)
                        .color(Color32::from_rgb(153, 128, 250)),
                );
            })
        });
    }
}
