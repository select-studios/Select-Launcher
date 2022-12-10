import 'dart:core';

class GameInfo {
  late String? username, description, logo;
  late List<String>? tags;

  GameInfo({
    this.username,
    this.description,
    this.tags,
    this.logo,
  });

  void setGameInfo({
    required String username,
    required String description,
    required String logo,
    required List<String> tags,
  }) {
    this.username = username;
    this.description = description;
    this.logo = logo;
    this.tags = tags;
  }

  Map<String, dynamic> getGameInfo() {
    return {
      'username': username,
      'description': description,
      'tags': tags,
      'logo': logo,
    };
  }
}

class GameInfoParser {}
