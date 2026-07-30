from flask import jsonify
from werkzeug.exceptions import HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError


def register_error_handlers(app):
    """Register error handlers for the application"""
    
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad request'}), 400
    
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({'error': 'Forbidden', 'message': 'Insufficient permissions'}), 403
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found', 'message': 'Resource not found'}), 404
    
    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({'error': 'Method not allowed'}), 405
    
    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({'error': 'Internal server error', 'message': 'An unexpected error occurred'}), 500
    
    @app.errorhandler(IntegrityError)
    def handle_integrity_error(error):
        app.logger.exception('Database integrity error')
        return jsonify({'error': 'Database integrity error', 'message': 'Duplicate entry or constraint violation'}), 409
    
    @app.errorhandler(SQLAlchemyError)
    def handle_db_error(error):
        app.logger.exception('Database error')
        return jsonify({'error': 'Database error', 'message': 'An error occurred with the database'}), 500
    
    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        if isinstance(error, HTTPException):
            return error
        app.logger.exception('Unexpected error')
        return jsonify({'error': 'Unexpected error', 'message': 'An unexpected error occurred'}), 500

