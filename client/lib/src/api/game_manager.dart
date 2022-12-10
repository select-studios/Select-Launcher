import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:git/git.dart';
import 'package:path_provider/path_provider.dart';
import 'package:git_clone/git_clone.dart';

Future<bool> checkIfTmpDirectoryExists() async {
  String tmpDir = await getTemporaryDirectory().then((value) => value.path);
  bool tmpDirExists =
      await Directory('$tmpDir\\SelectLauncher\\Select Games Info').exists();
  if (kDebugMode) {
    print('$tmpDir\\SelectLauncher\\Select Games Info');
  }
  return tmpDirExists;
}

void createTmpDirectory() async {
  String tmpDir = await getTemporaryDirectory().then((value) => value.path);
  Directory createdTmpDir =
      await Directory('$tmpDir\\SelectLauncher\\Select Games Info')
          .create(recursive: true);
  if (kDebugMode) {
    print(createdTmpDir.existsSync());
  }
}

// Not Needed but might need in the future
// Future<bool> checkIfClonedGameInfoDirExists() async {
//   String tmpDir = await getTemporaryDirectory().then((value) => value.path);
//   bool tmpDirExists = await Directory(
//     '$tmpDir\\SelectLauncher\\Select Games Info',
//   ).exists();
//   return tmpDirExists;
// }

void cloneGameInfo() async {
  String tmpDir = await getTemporaryDirectory().then((value) => value.path);
  gitClone(
    repo: 'https://github.com/select-studios/LauncherGamesInfo.git',
    directory: '$tmpDir\\SelectLauncher\\Select Games Info',
  );
  if (kDebugMode) {
    print('cloned game info');
  }
}

void pullGameInfo() async {
  String tmpDir = await getTemporaryDirectory().then((value) => value.path);
  if (await GitDir.isGitDir(
      '$tmpDir\\SelectLauncher\\Select Games Info\\LauncherGamesInfo')) {
    final gitDir = await GitDir.fromExisting(
        '$tmpDir\\SelectLauncher\\Select Games Info\\LauncherGamesInfo');

    gitDir.runCommand(['pull'], echoOutput: true).then(
      (value) => {
        if (kDebugMode) {print('fetched game info. $value')}
      },
    );
  }
}
